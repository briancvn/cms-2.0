<?php

return [
    'debug' => true,
    'hostName' => 'localhost',
    'clientHostName' => 'localhost',
    'database' => [
        'mongo'  => [
            'server'     => 'mongodb://localhost:27017',
            'dbname'   => 'cms',
            'username' => '',
            'password' => ''
        ]
    ],
    'cors' => [
        'allowedOrigins' => ['*']
    ]
];
