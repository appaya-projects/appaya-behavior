
/* tslint:disable */
declare const __karma__: any;
declare const __html__: any;
declare const require: any;

__karma__.loaded = function () {};

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);

__karma__.start();

