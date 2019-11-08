'use strict';

const Stream = require('stream');

const Payload = require('./payload');


const internals = {};


export default class extends Stream.Transform {

    constructor() {

        super();
        this.buffers = [];
    }

    _transform(chunk, encoding, next) {

        this.buffers.push(chunk);
        next(null, chunk);
    }

    collect() {

        return new Payload(this.buffers);
    }
};
