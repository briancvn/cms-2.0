<?php

namespace CMS\Controllers;

//use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\DispatcherInterface;
use Phalcon\Mvc\Model\CriteriaInterface;
use Phalcon\Mvc\ModelInterface;
use Phalcon\Mvc\View;

use CMS\Extensions\Mvc\Controller;

abstract class ApiController extends Controller
{
    /**
     * If the controller is in an error state
     * This should be set to true if an exception is uncaught by the called action
     * @var bool
     */
    private $isErrored = false;

    protected function initialize()
    {
        // Use a custom handler for any exceptions thrown from this controller type
        $this->eventsManager->attach('dispatch:beforeException', $this);
    }

    /**
     * Get the search/query/filter from the request
     * @return string
     */
    public function getQuery()
    {
        return $this->request->get('q', 'trim');
    }

    /**
     * Get the offset to return from relative to the start of the result set
     * @return int
     */
    public function getOffset()
    {
        return (int) $this->request->get('offset');
    }

    /**
     * Get the maximum number of results the request should return
     * @return int
     */
    public function getLimit()
    {
        return (int) $this->request->get('limit');
    }

    /**
     * @param CriteriaInterface $query
     * @return \Phalcon\Mvc\Model\CriteriaInterface
     */
    protected function applyLimitsToQuery(CriteriaInterface $query)
    {
        if ($this->getLimit()) {
            $query->limit($this->getLimit(), $this->getOffset());
        }
        return $query;
    }

    /**
     * Wrap all results and send to client encoded as JSON
     * @param DispatcherInterface $dispatcher
     */
    public function afterExecuteRoute(DispatcherInterface $dispatcher)
    {
        $result = $dispatcher->getReturnedValue();

        // Don't attempt to transform the response as it wasn't completed
        if ($this->isErrored) {
            return;
        }

        // Expand query objects into arrays
        if ($result instanceof CriteriaInterface) {
            $result = $result->execute()->toArray();
        }

        // Transform a model return value to an array of fields
        if ($result instanceof ModelInterface) {
            $result = $result->toArray();
        }

        // Only accept arrays and scalars to send to the client
        if (!is_array($result) && !is_scalar($result) && !is_null($result)) {
            $this->sendException(
                new \RuntimeException(sprintf(
                    'Expected array or scalar return type from controller. Got %s instead',
                    is_object($result) ? get_class($result) : gettype($result)
                ))
            );
        }

        $output = [
            'result' => $result
        ];

        $this->send($output);
    }

    public function beforeException(\Phalcon\Events\Event $event, Dispatcher $dispatcher, \Exception $exception)
    {
        $this->isErrored = true;
        $this->sendException($exception);
        return false;
    }

    protected function sendAccessDenied()
    {
        $this->isErrored = true;
        $this->response->setStatusCode(403, 'Access denied');

        $this->send([
            'error' => true,
            'message' => 'You don\'t have permission to access that resource.'
        ]);
    }

    protected function sendNotFound()
    {
        $this->isErrored = true;
        $this->response->setStatusCode(404, 'Resource not found');

        $this->send([
            'error' => true,
            'message' => 'No resource found'
        ]);
    }

    protected function checkSecurityToken()
    {
        $token = $this->request->getPost('token');

        if ($token && $token === $this->security->getSessionToken()) {
            return true;
        }

        $this->isErrored = true;
        $this->response->setStatusCode(400, 'Invalid security token');

        $this->send([
            'error' => true,
            'code' => 'bad-token',
            'message' => 'Invalid security token'
        ]);

        return false;
    }

    private function sendException(\Exception $exception)
    {
        $this->response->setStatusCode(500, 'Server error');

        if (DEV_MODE) {
            $this->send([
                'error' => true,
                'message' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString()
            ]);
        } else {
            $this->send([
                'error' => true,
                'message' => 'The server encountered a fatal error trying to process your request.'
            ]);

            // Log the exception with your own logger here if needed
        }
    }


    /**
     * Put data in the response as JSON
     * @param mixed $output
     */
    private function send($output)
    {
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
        $this->response->setContentType('application/json');

        $opts = DEV_MODE ? JSON_PRETTY_PRINT : 0;
        $json = json_encode($output, $opts);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \RuntimeException('Failed to convert server response to JSON: ' . json_last_error_msg());
        }

        $this->response->setContent($json);
        $this->response->send();
    }
}