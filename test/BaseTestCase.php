<?php

namespace Test;

use Phalcon\Di;
use Phalcon\Test\UnitTestCase as PhalconTestCase;
use Phalcon\Annotations\Adapter\Memory as MemoryAnnAdaptor;

abstract class BaseTestCase extends PhalconTestCase
{
    private $_loaded = false;

    public function setUp()
    {
        $this->setDi(Di::getDefault());
        $this->injectHandler();
        $this->_loaded = true;
    }

    private function injectHandler()
    {
        $reader = new MemoryAnnAdaptor();
        $reflector = $reader->get($this);
        foreach($reflector->getPropertiesAnnotations() as $propName => $propAnnotations) {
            if ($propAnnotations->has('Inject')) {
                $this->$propName = $this->di->get($propAnnotations->get('Inject')->getArguments()[0]);
            }
        }
    }

    /**
     * Check if the test case is setup properly
     * @throws \PHPUnit_Framework_IncompleteTestError;
     */
    public function __destruct()
    {
        if (!$this->_loaded) {
            throw new \PHPUnit_Framework_IncompleteTestError(
                "Please run parent::setUp()."
            );
        }
    }
}