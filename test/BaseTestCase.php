<?php

namespace Test;

use Phalcon\Di;
use Phalcon\Test\UnitTestCase as PhalconTestCase;
use Phalcon\Annotations\Adapter\Memory as MemoryAnnAdaptor;

use Test\Generator\BaseGenerator;

abstract class BaseTestCase extends PhalconTestCase
{
    private $_loaded = false;
    private $_generators = array();

    public function setUp()
    {
        $this->setDi(Di::getDefault());
        $this->injectHandler();
        $this->_loaded = true;
    }

    /**
     * Check if the test case is setup properly
     * @throws \PHPUnit_Framework_IncompleteTestError;
     */
    public function __destruct()
    {
        if (!$this->_loaded) {
            throw new \PHPUnit_Framework_IncompleteTestError("Please run parent::setUp().");
        }
        $this->cleanGenerators();
    }

    protected function tearDown()
    {
        Di::reset();
        parent::tearDown();
        $this->cleanGenerators();
    }

    private function injectHandler()
    {
        $reader = new MemoryAnnAdaptor();
        $reflector = $reader->get($this);
        foreach($reflector->getPropertiesAnnotations() as $propName => $propAnnotations) {
            if ($propAnnotations->has('Inject')) {
                $service = $this->di->get($propAnnotations->get('Inject')->getArguments()[0]);
                $this->$propName = $service;
                if (is_subclass_of($service, BaseGenerator::class)) {
                    array_push($this->_generators, $service);
                    $service->init();
                }
            }
        }
    }

    private function cleanGenerators(){
        foreach($this->_generators as $generator) {
            $generator->clean();
        }
    }
}