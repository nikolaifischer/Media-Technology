// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
    module.exports === exports) {
    // Export the *name* of this Angular module
    // Sample usage:
    //
    //   import lbServices from './lb-services';
    //   angular.module('app', [lbServices]);
    //
    module.exports = "lbServices";
}

(function(window, angular, undefined) {
    'use strict';

    var urlBase = "/api";
    var authHeader = 'authorization';

    function getHost(url) {
        var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
        return m ? m[1] : null;
    }

    var urlBaseHost = getHost(urlBase) || location.host;

    /**
     * @ngdoc overview
     * @name lbServices
     * @module
     * @description
     *
     * The `lbServices` module provides services for interacting with
     * the models exposed by the LoopBack server via the REST API.
     *
     */
    var module = angular.module("lbServices", ['ngResource']);

    /**
     * @ngdoc object
     * @name lbServices.User
     * @header lbServices.User
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `User` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "User",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Users/:id",
                    { 'id': '@id' },
                    {

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__findById__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Find a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "prototype$__findById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Users/:id/accessTokens/:fk",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__destroyById__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Delete a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "prototype$__destroyById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Users/:id/accessTokens/:fk",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__updateById__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Update a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "prototype$__updateById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Users/:id/accessTokens/:fk",
                            method: "PUT",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__get__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Queries accessTokens of User.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `filter` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "prototype$__get__accessTokens": {
                            isArray: true,
                            url: urlBase + "/Users/:id/accessTokens",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__create__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Creates a new instance in accessTokens of this model.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "prototype$__create__accessTokens": {
                            url: urlBase + "/Users/:id/accessTokens",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__delete__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Deletes all accessTokens of this model.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `where` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "prototype$__delete__accessTokens": {
                            url: urlBase + "/Users/:id/accessTokens",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$__count__accessTokens
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Counts accessTokens of User.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "prototype$__count__accessTokens": {
                            url: urlBase + "/Users/:id/accessTokens/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#create
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Users",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#createMany
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Users",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#patchOrCreate
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Users",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#replaceOrCreate
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Users/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#upsertWithWhere
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Users/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#exists
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Users/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#findById
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Users/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#replaceById
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Users/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#find
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Users",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#findOne
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Users/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#updateAll
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Users/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#deleteById
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Users/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#count
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Users/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#prototype$patchAttributes
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - User id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `User` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Users/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#createChangeStream
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Users/change-stream",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#login
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Login a user with username/email and password.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
                         *   Default value: `user`.
                         *
                         *  - `rememberMe` - `boolean` - Whether the authentication credentials
                         *     should be remembered in localStorage across app/browser restarts.
                         *     Default: `true`.
                         *
                         * @param {Object} postData Request data.
                         *
                         * This method expects a subset of model properties as request parameters.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * The response body contains properties of the AccessToken created on login.
                         * Depending on the value of `include` parameter, the body may contain additional properties:
                         *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
                         *
                         */
                        "login": {
                            params: {
                                include: 'user',
                            },
                            interceptor: {
                                response: function(response) {
                                    var accessToken = response.data;
                                    LoopBackAuth.setUser(
                                        accessToken.id, accessToken.userId, accessToken.user);
                                    LoopBackAuth.rememberMe =
                                        response.config.params.rememberMe !== false;
                                    LoopBackAuth.save();
                                    return response.resource;
                                },
                            },
                            url: urlBase + "/Users/login",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#logout
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Logout a user with access token.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "logout": {
                            interceptor: {
                                response: function(response) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return response.resource;
                                },
                                responseError: function(responseError) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return responseError.resource;
                                },
                            },
                            url: urlBase + "/Users/logout",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#confirm
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Confirm a user registration with email verification token.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `uid` – `{string}` -
                         *
                         *  - `token` – `{string}` -
                         *
                         *  - `redirect` – `{string=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "confirm": {
                            url: urlBase + "/Users/confirm",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#resetPassword
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Reset password for a user with email.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         * This method expects a subset of model properties as request parameters.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "resetPassword": {
                            url: urlBase + "/Users/reset",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.User#getCurrent
                         * @methodOf lbServices.User
                         *
                         * @description
                         *
                         * Get data of the currently logged user. Fail with HTTP result 401
                         * when there is no user logged in.
                         *
                         * @param {function(Object,Object)=} successCb
                         *    Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *    `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         */
                        'getCurrent': {
                            url: urlBase + "/Users" + '/:id',
                            method: 'GET',
                            params: {
                                id: function() {
                                    var id = LoopBackAuth.currentUserId;
                                    if (id == null) id = '__anonymous__';
                                    return id;
                                },
                            },
                            interceptor: {
                                response: function(response) {
                                    LoopBackAuth.currentUserData = response.data;
                                    return response.resource;
                                },
                                responseError: function(responseError) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return $q.reject(responseError);
                                },
                            },
                            __isGetCurrentUser__: true,
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.User#upsert
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#updateOrCreate
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#patchOrCreateWithWhere
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#update
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#destroyById
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#removeById
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#updateAttributes
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - User id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `User` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];

                /**
                 * @ngdoc method
                 * @name lbServices.User#getCachedCurrent
                 * @methodOf lbServices.User
                 *
                 * @description
                 *
                 * Get data of the currently logged user that was returned by the last
                 * call to {@link lbServices.User#login} or
                 * {@link lbServices.User#getCurrent}. Return null when there
                 * is no user logged in or the data of the current user were not fetched
                 * yet.
                 *
                 * @returns {Object} A User instance.
                 */
                R.getCachedCurrent = function() {
                    var data = LoopBackAuth.currentUserData;
                    return data ? new R(data) : null;
                };

                /**
                 * @ngdoc method
                 * @name lbServices.User#isAuthenticated
                 * @methodOf lbServices.User
                 *
                 * @returns {boolean} True if the current user is authenticated (logged in).
                 */
                R.isAuthenticated = function() {
                    return this.getCurrentId() != null;
                };

                /**
                 * @ngdoc method
                 * @name lbServices.User#getCurrentId
                 * @methodOf lbServices.User
                 *
                 * @returns {Object} Id of the currently logged-in user or null.
                 */
                R.getCurrentId = function() {
                    return LoopBackAuth.currentUserId;
                };

                /**
                 * @ngdoc property
                 * @name lbServices.User#modelName
                 * @propertyOf lbServices.User
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `User`.
                 */
                R.modelName = "User";



                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.PlatformUser
     * @header lbServices.PlatformUser
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `PlatformUser` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "PlatformUser",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/PlatformUsers/:id",
                    { 'id': '@id' },
                    {

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__findById__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Find a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "prototype$__findById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/accessTokens/:fk",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__destroyById__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Delete a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "prototype$__destroyById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/accessTokens/:fk",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__updateById__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Update a related item by id for accessTokens.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `fk` – `{*}` - Foreign key for accessTokens
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "prototype$__updateById__accessTokens": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/accessTokens/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/PlatformUsers/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise.findById() instead.
                        "prototype$__findById__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise.destroyById() instead.
                        "prototype$__destroyById__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.updateById() instead.
                        "prototype$__updateById__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.exercise.link() instead.
                        "prototype$__link__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.exercise.unlink() instead.
                        "prototype$__unlink__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.exists() instead.
                        "prototype$__exists__exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use PlatformUser.group() instead.
                        "prototype$__get__group": {
                            url: urlBase + "/PlatformUsers/:id/group",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.findById() instead.
                        "prototype$__findById__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.destroyById() instead.
                        "prototype$__destroyById__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.updateById() instead.
                        "prototype$__updateById__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.link() instead.
                        "prototype$__link__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.unlink() instead.
                        "prototype$__unlink__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.exists() instead.
                        "prototype$__exists__tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "HEAD",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__get__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Queries accessTokens of PlatformUser.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `filter` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "prototype$__get__accessTokens": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/accessTokens",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__create__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Creates a new instance in accessTokens of this model.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "prototype$__create__accessTokens": {
                            url: urlBase + "/PlatformUsers/:id/accessTokens",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__delete__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Deletes all accessTokens of this model.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `where` – `{object=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "prototype$__delete__accessTokens": {
                            url: urlBase + "/PlatformUsers/:id/accessTokens",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$__count__accessTokens
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Counts accessTokens of PlatformUser.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "prototype$__count__accessTokens": {
                            url: urlBase + "/PlatformUsers/:id/accessTokens/count",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise() instead.
                        "prototype$__get__exercise": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise.create() instead.
                        "prototype$__create__exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.exercise.destroyAll() instead.
                        "prototype$__delete__exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.count() instead.
                        "prototype$__count__exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise/count",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs() instead.
                        "prototype$__get__tutorPossibleLabs": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.create() instead.
                        "prototype$__create__tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.destroyAll() instead.
                        "prototype$__delete__tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.count() instead.
                        "prototype$__count__tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#create
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/PlatformUsers",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#createMany
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#patchOrCreate
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/PlatformUsers",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#replaceOrCreate
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/PlatformUsers/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#upsertWithWhere
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/PlatformUsers/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#exists
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/PlatformUsers/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#findById
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/PlatformUsers/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#replaceById
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/PlatformUsers/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#find
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#findOne
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/PlatformUsers/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#updateAll
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/PlatformUsers/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#deleteById
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/PlatformUsers/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#count
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/PlatformUsers/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#prototype$patchAttributes
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PlatformUser` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/PlatformUsers/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#createChangeStream
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/PlatformUsers/change-stream",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#login
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Login a user with username/email and password.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
                         *   Default value: `user`.
                         *
                         *  - `rememberMe` - `boolean` - Whether the authentication credentials
                         *     should be remembered in localStorage across app/browser restarts.
                         *     Default: `true`.
                         *
                         * @param {Object} postData Request data.
                         *
                         * This method expects a subset of model properties as request parameters.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * The response body contains properties of the AccessToken created on login.
                         * Depending on the value of `include` parameter, the body may contain additional properties:
                         *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
                         *
                         */
                        "login": {
                            params: {
                                include: 'user',
                            },
                            interceptor: {
                                response: function(response) {
                                    var accessToken = response.data;
                                    LoopBackAuth.setUser(
                                        accessToken.id, accessToken.userId, accessToken.user);
                                    LoopBackAuth.rememberMe =
                                        response.config.params.rememberMe !== false;
                                    LoopBackAuth.save();
                                    return response.resource;
                                },
                            },
                            url: urlBase + "/PlatformUsers/login",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#logout
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Logout a user with access token.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "logout": {
                            interceptor: {
                                response: function(response) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return response.resource;
                                },
                                responseError: function(responseError) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return responseError.resource;
                                },
                            },
                            url: urlBase + "/PlatformUsers/logout",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#confirm
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Confirm a user registration with email verification token.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `uid` – `{string}` -
                         *
                         *  - `token` – `{string}` -
                         *
                         *  - `redirect` – `{string=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "confirm": {
                            url: urlBase + "/PlatformUsers/confirm",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#resetPassword
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Reset password for a user with email.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         * This method expects a subset of model properties as request parameters.
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * This method returns no data.
                         */
                        "resetPassword": {
                            url: urlBase + "/PlatformUsers/reset",
                            method: "POST",
                        },

                        // INTERNAL. Use Exercise.participants.findById() instead.
                        "::findById::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.participants.destroyById() instead.
                        "::destroyById::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.updateById() instead.
                        "::updateById::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Exercise.participants.link() instead.
                        "::link::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Exercise.participants.unlink() instead.
                        "::unlink::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.exists() instead.
                        "::exists::Exercise::participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Exercise.participants() instead.
                        "::get::Exercise::participants": {
                            isArray: true,
                            url: urlBase + "/Exercises/:id/participants",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.participants.create() instead.
                        "::create::Exercise::participants": {
                            url: urlBase + "/Exercises/:id/participants",
                            method: "POST",
                        },

                        // INTERNAL. Use Exercise.participants.createMany() instead.
                        "::createMany::Exercise::participants": {
                            isArray: true,
                            url: urlBase + "/Exercises/:id/participants",
                            method: "POST",
                        },

                        // INTERNAL. Use Exercise.participants.destroyAll() instead.
                        "::delete::Exercise::participants": {
                            url: urlBase + "/Exercises/:id/participants",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.count() instead.
                        "::count::Exercise::participants": {
                            url: urlBase + "/Exercises/:id/participants/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.groupMembers.findById() instead.
                        "::findById::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.groupMembers.destroyById() instead.
                        "::destroyById::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.updateById() instead.
                        "::updateById::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.groupMembers.link() instead.
                        "::link::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.groupMembers.unlink() instead.
                        "::unlink::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.exists() instead.
                        "::exists::Group::groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.groupMembers() instead.
                        "::get::Group::groupMembers": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.groupMembers.create() instead.
                        "::create::Group::groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.groupMembers.createMany() instead.
                        "::createMany::Group::groupMembers": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.groupMembers.destroyAll() instead.
                        "::delete::Group::groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.count() instead.
                        "::count::Group::groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.tutor() instead.
                        "::get::Lab::tutor": {
                            url: urlBase + "/Labs/:id/tutor",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PlatformUser#getCurrent
                         * @methodOf lbServices.PlatformUser
                         *
                         * @description
                         *
                         * Get data of the currently logged user. Fail with HTTP result 401
                         * when there is no user logged in.
                         *
                         * @param {function(Object,Object)=} successCb
                         *    Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *    `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         */
                        'getCurrent': {
                            url: urlBase + "/PlatformUsers" + '/:id',
                            method: 'GET',
                            params: {
                                id: function() {
                                    var id = LoopBackAuth.currentUserId;
                                    if (id == null) id = '__anonymous__';
                                    return id;
                                },
                            },
                            interceptor: {
                                response: function(response) {
                                    LoopBackAuth.currentUserData = response.data;
                                    return response.resource;
                                },
                                responseError: function(responseError) {
                                    LoopBackAuth.clearUser();
                                    LoopBackAuth.clearStorage();
                                    return $q.reject(responseError);
                                },
                            },
                            __isGetCurrentUser__: true,
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#upsert
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#updateOrCreate
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#patchOrCreateWithWhere
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#update
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#destroyById
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#removeById
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#updateAttributes
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#getCachedCurrent
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Get data of the currently logged user that was returned by the last
                 * call to {@link lbServices.PlatformUser#login} or
                 * {@link lbServices.PlatformUser#getCurrent}. Return null when there
                 * is no user logged in or the data of the current user were not fetched
                 * yet.
                 *
                 * @returns {Object} A PlatformUser instance.
                 */
                R.getCachedCurrent = function() {
                    var data = LoopBackAuth.currentUserData;
                    return data ? new R(data) : null;
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#isAuthenticated
                 * @methodOf lbServices.PlatformUser
                 *
                 * @returns {boolean} True if the current user is authenticated (logged in).
                 */
                R.isAuthenticated = function() {
                    return this.getCurrentId() != null;
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#getCurrentId
                 * @methodOf lbServices.PlatformUser
                 *
                 * @returns {Object} Id of the currently logged-in user or null.
                 */
                R.getCurrentId = function() {
                    return LoopBackAuth.currentUserId;
                };

                /**
                 * @ngdoc property
                 * @name lbServices.PlatformUser#modelName
                 * @propertyOf lbServices.PlatformUser
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `PlatformUser`.
                 */
                R.modelName = "PlatformUser";


                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#semester
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::PlatformUser::semester"];
                    return action.apply(R, arguments);
                };
                /**
                 * @ngdoc object
                 * @name lbServices.PlatformUser.exercise
                 * @header lbServices.PlatformUser.exercise
                 * @object
                 * @description
                 *
                 * The object `PlatformUser.exercise` groups methods
                 * manipulating `Exercise` instances related to `PlatformUser`.
                 *
                 * Call {@link lbServices.PlatformUser#exercise PlatformUser.exercise()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#exercise
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Queries exercise of PlatformUser.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::get::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#count
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Counts exercise of PlatformUser.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.exercise.count = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::count::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#create
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Creates a new instance in exercise of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.create = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::create::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#createMany
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Creates a new instance in exercise of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.createMany = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::createMany::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#destroyAll
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Deletes all exercise of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.exercise.destroyAll = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::delete::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#destroyById
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Delete a related item by id for exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.exercise.destroyById = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::destroyById::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#exists
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Check the existence of exercise relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.exists = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::exists::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#findById
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Find a related item by id for exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.findById = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::findById::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#link
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Add a related item by id for exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.link = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::link::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#unlink
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Remove the exercise relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.exercise.unlink = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::unlink::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.exercise#updateById
                 * @methodOf lbServices.PlatformUser.exercise
                 *
                 * @description
                 *
                 * Update a related item by id for exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `fk` – `{*}` - Foreign key for exercise
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R.exercise.updateById = function() {
                    var TargetResource = $injector.get("Exercise");
                    var action = TargetResource["::updateById::PlatformUser::exercise"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#group
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Fetches belongsTo relation group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R.group = function() {
                    var TargetResource = $injector.get("Group");
                    var action = TargetResource["::get::PlatformUser::group"];
                    return action.apply(R, arguments);
                };
                /**
                 * @ngdoc object
                 * @name lbServices.PlatformUser.tutorPossibleLabs
                 * @header lbServices.PlatformUser.tutorPossibleLabs
                 * @object
                 * @description
                 *
                 * The object `PlatformUser.tutorPossibleLabs` groups methods
                 * manipulating `Lab` instances related to `PlatformUser`.
                 *
                 * Call {@link lbServices.PlatformUser#tutorPossibleLabs PlatformUser.tutorPossibleLabs()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser#tutorPossibleLabs
                 * @methodOf lbServices.PlatformUser
                 *
                 * @description
                 *
                 * Queries tutorPossibleLabs of PlatformUser.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::get::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#count
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Counts tutorPossibleLabs of PlatformUser.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.tutorPossibleLabs.count = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::count::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#create
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Creates a new instance in tutorPossibleLabs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.create = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::create::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#createMany
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Creates a new instance in tutorPossibleLabs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.createMany = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::createMany::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#destroyAll
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Deletes all tutorPossibleLabs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.tutorPossibleLabs.destroyAll = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::delete::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#destroyById
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Delete a related item by id for tutorPossibleLabs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.tutorPossibleLabs.destroyById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::destroyById::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#exists
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Check the existence of tutorPossibleLabs relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.exists = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::exists::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#findById
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Find a related item by id for tutorPossibleLabs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.findById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::findById::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#link
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Add a related item by id for tutorPossibleLabs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.link = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::link::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#unlink
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Remove the tutorPossibleLabs relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.tutorPossibleLabs.unlink = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::unlink::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.PlatformUser.tutorPossibleLabs#updateById
                 * @methodOf lbServices.PlatformUser.tutorPossibleLabs
                 *
                 * @description
                 *
                 * Update a related item by id for tutorPossibleLabs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PlatformUser id
                 *
                 *  - `fk` – `{*}` - Foreign key for tutorPossibleLabs
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.tutorPossibleLabs.updateById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::updateById::PlatformUser::tutorPossibleLabs"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.Semester
     * @header lbServices.Semester
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `Semester` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "Semester",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Semesters/:id",
                    { 'id': '@id' },
                    {

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#create
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Semesters",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#createMany
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Semesters",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#patchOrCreate
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Semesters",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#replaceOrCreate
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Semesters/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#upsertWithWhere
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Semesters/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#exists
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Semesters/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#findById
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Semesters/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#replaceById
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Semesters/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#find
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Semesters",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#findOne
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Semesters/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#updateAll
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Semesters/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#deleteById
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Semesters/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#count
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Semesters/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#prototype$patchAttributes
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Semester id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Semester` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Semesters/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Semester#createChangeStream
                         * @methodOf lbServices.Semester
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Semesters/change-stream",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.semester() instead.
                        "::get::PlatformUser::semester": {
                            url: urlBase + "/PlatformUsers/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use UniqueDate.semester() instead.
                        "::get::UniqueDate::semester": {
                            url: urlBase + "/UniqueDates/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.semester() instead.
                        "::get::Exercise::semester": {
                            url: urlBase + "/Exercises/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.semester() instead.
                        "::get::Group::semester": {
                            url: urlBase + "/Groups/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.semester() instead.
                        "::get::Lab::semester": {
                            url: urlBase + "/Labs/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.semester() instead.
                        "::get::Priority::semester": {
                            url: urlBase + "/Priorities/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use LabType.semester() instead.
                        "::get::LabType::semester": {
                            url: urlBase + "/LabTypes/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use PendingPlatformUser.semester() instead.
                        "::get::PendingPlatformUser::semester": {
                            url: urlBase + "/PendingPlatformUsers/:id/semester",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.Semester#upsert
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#updateOrCreate
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#patchOrCreateWithWhere
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#update
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#destroyById
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#removeById
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Semester#updateAttributes
                 * @methodOf lbServices.Semester
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Semester id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.Semester#modelName
                 * @propertyOf lbServices.Semester
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `Semester`.
                 */
                R.modelName = "Semester";



                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.UniqueDate
     * @header lbServices.UniqueDate
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `UniqueDate` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "UniqueDate",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/UniqueDates/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use UniqueDate.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/UniqueDates/:id/semester",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#create
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/UniqueDates",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#createMany
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/UniqueDates",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#patchOrCreate
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/UniqueDates",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#replaceOrCreate
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/UniqueDates/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#upsertWithWhere
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/UniqueDates/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#exists
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/UniqueDates/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#findById
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/UniqueDates/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#replaceById
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/UniqueDates/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#find
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/UniqueDates",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#findOne
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/UniqueDates/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#updateAll
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/UniqueDates/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#deleteById
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/UniqueDates/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#count
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/UniqueDates/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#prototype$patchAttributes
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - UniqueDate id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `UniqueDate` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/UniqueDates/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.UniqueDate#createChangeStream
                         * @methodOf lbServices.UniqueDate
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/UniqueDates/change-stream",
                            method: "POST",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#upsert
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#updateOrCreate
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#patchOrCreateWithWhere
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#update
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#destroyById
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#removeById
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#updateAttributes
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - UniqueDate id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `UniqueDate` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.UniqueDate#modelName
                 * @propertyOf lbServices.UniqueDate
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `UniqueDate`.
                 */
                R.modelName = "UniqueDate";


                /**
                 * @ngdoc method
                 * @name lbServices.UniqueDate#semester
                 * @methodOf lbServices.UniqueDate
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - UniqueDate id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::UniqueDate::semester"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.Exercise
     * @header lbServices.Exercise
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `Exercise` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "Exercise",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Exercises/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use Exercise.participants.findById() instead.
                        "prototype$__findById__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.participants.destroyById() instead.
                        "prototype$__destroyById__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.updateById() instead.
                        "prototype$__updateById__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Exercise.participants.link() instead.
                        "prototype$__link__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Exercise.participants.unlink() instead.
                        "prototype$__unlink__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.exists() instead.
                        "prototype$__exists__participants": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Exercises/:id/participants/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Exercise.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/Exercises/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.participants() instead.
                        "prototype$__get__participants": {
                            isArray: true,
                            url: urlBase + "/Exercises/:id/participants",
                            method: "GET",
                        },

                        // INTERNAL. Use Exercise.participants.create() instead.
                        "prototype$__create__participants": {
                            url: urlBase + "/Exercises/:id/participants",
                            method: "POST",
                        },

                        // INTERNAL. Use Exercise.participants.destroyAll() instead.
                        "prototype$__delete__participants": {
                            url: urlBase + "/Exercises/:id/participants",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Exercise.participants.count() instead.
                        "prototype$__count__participants": {
                            url: urlBase + "/Exercises/:id/participants/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#create
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Exercises",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#createMany
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Exercises",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#patchOrCreate
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Exercises",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#replaceOrCreate
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Exercises/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#upsertWithWhere
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Exercises/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#exists
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Exercises/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#findById
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Exercises/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#replaceById
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Exercises/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#find
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Exercises",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#findOne
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Exercises/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#updateAll
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Exercises/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#deleteById
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Exercises/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#count
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Exercises/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#prototype$patchAttributes
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Exercise id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Exercise` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Exercises/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#createChangeStream
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Exercises/change-stream",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#enroll
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * <em>
                         * (The remote method definition does not provide any description.)
                         * </em>
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `exerciseId` – `{string=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exercise` – `{object=}` -
                         */
                        "enroll": {
                            url: urlBase + "/Exercises/enroll",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Exercise#disenroll
                         * @methodOf lbServices.Exercise
                         *
                         * @description
                         *
                         * <em>
                         * (The remote method definition does not provide any description.)
                         * </em>
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `exerciseId` – `{string=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exercise` – `{object=}` -
                         */
                        "disenroll": {
                            url: urlBase + "/Exercises/disenroll",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.exercise.findById() instead.
                        "::findById::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise.destroyById() instead.
                        "::destroyById::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.updateById() instead.
                        "::updateById::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.exercise.link() instead.
                        "::link::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.exercise.unlink() instead.
                        "::unlink::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.exists() instead.
                        "::exists::PlatformUser::exercise": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/exercise/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use PlatformUser.exercise() instead.
                        "::get::PlatformUser::exercise": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.exercise.create() instead.
                        "::create::PlatformUser::exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.exercise.createMany() instead.
                        "::createMany::PlatformUser::exercise": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.exercise.destroyAll() instead.
                        "::delete::PlatformUser::exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.exercise.count() instead.
                        "::count::PlatformUser::exercise": {
                            url: urlBase + "/PlatformUsers/:id/exercise/count",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#upsert
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#updateOrCreate
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#patchOrCreateWithWhere
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#update
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#destroyById
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#removeById
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#updateAttributes
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Exercise` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.Exercise#modelName
                 * @propertyOf lbServices.Exercise
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `Exercise`.
                 */
                R.modelName = "Exercise";

                /**
                 * @ngdoc object
                 * @name lbServices.Exercise.participants
                 * @header lbServices.Exercise.participants
                 * @object
                 * @description
                 *
                 * The object `Exercise.participants` groups methods
                 * manipulating `PlatformUser` instances related to `Exercise`.
                 *
                 * Call {@link lbServices.Exercise#participants Exercise.participants()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#participants
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Queries participants of Exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::get::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#count
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Counts participants of Exercise.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.participants.count = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::count::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#create
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Creates a new instance in participants of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.create = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::create::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#createMany
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Creates a new instance in participants of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.createMany = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::createMany::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#destroyAll
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Deletes all participants of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.participants.destroyAll = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::delete::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#destroyById
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Delete a related item by id for participants.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.participants.destroyById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::destroyById::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#exists
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Check the existence of participants relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.exists = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::exists::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#findById
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Find a related item by id for participants.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.findById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::findById::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#link
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Add a related item by id for participants.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.link = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::link::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#unlink
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Remove the participants relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.participants.unlink = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::unlink::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise.participants#updateById
                 * @methodOf lbServices.Exercise.participants
                 *
                 * @description
                 *
                 * Update a related item by id for participants.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `fk` – `{*}` - Foreign key for participants
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.participants.updateById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::updateById::Exercise::participants"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Exercise#semester
                 * @methodOf lbServices.Exercise
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Exercise id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::Exercise::semester"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.Group
     * @header lbServices.Group
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `Group` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "Group",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Groups/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use Group.groupMembers.findById() instead.
                        "prototype$__findById__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.groupMembers.destroyById() instead.
                        "prototype$__destroyById__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.updateById() instead.
                        "prototype$__updateById__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.groupMembers.link() instead.
                        "prototype$__link__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.groupMembers.unlink() instead.
                        "prototype$__unlink__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.exists() instead.
                        "prototype$__exists__groupMembers": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/groupMembers/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/Groups/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.findById() instead.
                        "prototype$__findById__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.destroyById() instead.
                        "prototype$__destroyById__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.updateById() instead.
                        "prototype$__updateById__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.labs.link() instead.
                        "prototype$__link__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.labs.unlink() instead.
                        "prototype$__unlink__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.exists() instead.
                        "prototype$__exists__labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.priorities.findById() instead.
                        "prototype$__findById__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.priorities.destroyById() instead.
                        "prototype$__destroyById__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.updateById() instead.
                        "prototype$__updateById__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.priorities.link() instead.
                        "prototype$__link__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.priorities.unlink() instead.
                        "prototype$__unlink__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.exists() instead.
                        "prototype$__exists__priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.groupMembers() instead.
                        "prototype$__get__groupMembers": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.groupMembers.create() instead.
                        "prototype$__create__groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.groupMembers.destroyAll() instead.
                        "prototype$__delete__groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.groupMembers.count() instead.
                        "prototype$__count__groupMembers": {
                            url: urlBase + "/Groups/:id/groupMembers/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs() instead.
                        "prototype$__get__labs": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/labs",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.create() instead.
                        "prototype$__create__labs": {
                            url: urlBase + "/Groups/:id/labs",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.labs.destroyAll() instead.
                        "prototype$__delete__labs": {
                            url: urlBase + "/Groups/:id/labs",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.count() instead.
                        "prototype$__count__labs": {
                            url: urlBase + "/Groups/:id/labs/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.priorities() instead.
                        "prototype$__get__priorities": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/priorities",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.priorities.create() instead.
                        "prototype$__create__priorities": {
                            url: urlBase + "/Groups/:id/priorities",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.priorities.destroyAll() instead.
                        "prototype$__delete__priorities": {
                            url: urlBase + "/Groups/:id/priorities",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.count() instead.
                        "prototype$__count__priorities": {
                            url: urlBase + "/Groups/:id/priorities/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#create
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Groups",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#createMany
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Groups",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#patchOrCreate
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Groups",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#replaceOrCreate
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Groups/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#upsertWithWhere
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Groups/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#exists
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Groups/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#findById
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Groups/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#replaceById
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Groups/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#find
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Groups",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#findOne
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Groups/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#updateAll
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Groups/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#deleteById
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Groups/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#count
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Groups/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#prototype$patchAttributes
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Group id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Group` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Groups/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#createChangeStream
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Groups/change-stream",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#createByMail
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * <em>
                         * (The remote method definition does not provide any description.)
                         * </em>
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `emails` – `{*=}` -
                         *
                         *  - `name` – `{string=}` -
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `group` – `{object=}` -
                         */
                        "createByMail": {
                            url: urlBase + "/Groups/createByMail",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Group#randomJoin
                         * @methodOf lbServices.Group
                         *
                         * @description
                         *
                         * <em>
                         * (The remote method definition does not provide any description.)
                         * </em>
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `group` – `{object=}` -
                         */
                        "randomJoin": {
                            url: urlBase + "/Groups/randomJoin",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.group() instead.
                        "::get::PlatformUser::group": {
                            url: urlBase + "/PlatformUsers/:id/group",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.group() instead.
                        "::get::Lab::group": {
                            url: urlBase + "/Labs/:id/group",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.group() instead.
                        "::get::Priority::group": {
                            url: urlBase + "/Priorities/:id/group",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.Group#upsert
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#updateOrCreate
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#patchOrCreateWithWhere
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#update
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#destroyById
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#removeById
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Group#updateAttributes
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.Group#modelName
                 * @propertyOf lbServices.Group
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `Group`.
                 */
                R.modelName = "Group";

                /**
                 * @ngdoc object
                 * @name lbServices.Group.groupMembers
                 * @header lbServices.Group.groupMembers
                 * @object
                 * @description
                 *
                 * The object `Group.groupMembers` groups methods
                 * manipulating `PlatformUser` instances related to `Group`.
                 *
                 * Call {@link lbServices.Group#groupMembers Group.groupMembers()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.Group#groupMembers
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Queries groupMembers of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::get::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#count
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Counts groupMembers of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.groupMembers.count = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::count::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#create
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Creates a new instance in groupMembers of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.create = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::create::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#createMany
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Creates a new instance in groupMembers of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.createMany = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::createMany::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#destroyAll
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Deletes all groupMembers of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.groupMembers.destroyAll = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::delete::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#destroyById
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Delete a related item by id for groupMembers.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.groupMembers.destroyById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::destroyById::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#exists
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Check the existence of groupMembers relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.exists = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::exists::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#findById
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Find a related item by id for groupMembers.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.findById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::findById::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#link
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Add a related item by id for groupMembers.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.link = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::link::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#unlink
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Remove the groupMembers relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.groupMembers.unlink = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::unlink::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.groupMembers#updateById
                 * @methodOf lbServices.Group.groupMembers
                 *
                 * @description
                 *
                 * Update a related item by id for groupMembers.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for groupMembers
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.groupMembers.updateById = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::updateById::Group::groupMembers"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group#semester
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::Group::semester"];
                    return action.apply(R, arguments);
                };
                /**
                 * @ngdoc object
                 * @name lbServices.Group.labs
                 * @header lbServices.Group.labs
                 * @object
                 * @description
                 *
                 * The object `Group.labs` groups methods
                 * manipulating `Lab` instances related to `Group`.
                 *
                 * Call {@link lbServices.Group#labs Group.labs()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.Group#labs
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Queries labs of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::get::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#count
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Counts labs of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.labs.count = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::count::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#create
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Creates a new instance in labs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.create = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::create::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#createMany
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Creates a new instance in labs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.createMany = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::createMany::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#destroyAll
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Deletes all labs of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.labs.destroyAll = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::delete::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#destroyById
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Delete a related item by id for labs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.labs.destroyById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::destroyById::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#exists
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Check the existence of labs relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.exists = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::exists::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#findById
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Find a related item by id for labs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.findById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::findById::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#link
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Add a related item by id for labs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.link = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::link::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#unlink
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Remove the labs relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.labs.unlink = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::unlink::Group::labs"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.labs#updateById
                 * @methodOf lbServices.Group.labs
                 *
                 * @description
                 *
                 * Update a related item by id for labs.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for labs
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.labs.updateById = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::updateById::Group::labs"];
                    return action.apply(R, arguments);
                };
                /**
                 * @ngdoc object
                 * @name lbServices.Group.priorities
                 * @header lbServices.Group.priorities
                 * @object
                 * @description
                 *
                 * The object `Group.priorities` groups methods
                 * manipulating `Priority` instances related to `Group`.
                 *
                 * Call {@link lbServices.Group#priorities Group.priorities()}
                 * to query all related instances.
                 */


                /**
                 * @ngdoc method
                 * @name lbServices.Group#priorities
                 * @methodOf lbServices.Group
                 *
                 * @description
                 *
                 * Queries priorities of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `filter` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::get::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#count
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Counts priorities of Group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Data properties:
                 *
                 *  - `count` – `{number=}` -
                 */
                R.priorities.count = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::count::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#create
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Creates a new instance in priorities of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.create = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::create::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#createMany
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Creates a new instance in priorities of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Array.<Object>,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Array.<Object>} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.createMany = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::createMany::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#destroyAll
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Deletes all priorities of this model.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `where` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.priorities.destroyAll = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::delete::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#destroyById
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Delete a related item by id for priorities.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.priorities.destroyById = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::destroyById::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#exists
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Check the existence of priorities relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.exists = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::exists::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#findById
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Find a related item by id for priorities.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.findById = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::findById::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#link
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Add a related item by id for priorities.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.link = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::link::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#unlink
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Remove the priorities relation to an item by id.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * This method returns no data.
                 */
                R.priorities.unlink = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::unlink::Group::priorities"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Group.priorities#updateById
                 * @methodOf lbServices.Group.priorities
                 *
                 * @description
                 *
                 * Update a related item by id for priorities.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Group id
                 *
                 *  - `fk` – `{*}` - Foreign key for priorities
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R.priorities.updateById = function() {
                    var TargetResource = $injector.get("Priority");
                    var action = TargetResource["::updateById::Group::priorities"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.Lab
     * @header lbServices.Lab
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `Lab` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "Lab",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Labs/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use Lab.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/Labs/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.group() instead.
                        "prototype$__get__group": {
                            url: urlBase + "/Labs/:id/group",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.tutor() instead.
                        "prototype$__get__tutor": {
                            url: urlBase + "/Labs/:id/tutor",
                            method: "GET",
                        },

                        // INTERNAL. Use Lab.labType() instead.
                        "prototype$__get__labType": {
                            url: urlBase + "/Labs/:id/labType",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#create
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Labs",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#createMany
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Labs",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#patchOrCreate
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Labs",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#replaceOrCreate
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Labs/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#upsertWithWhere
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Labs/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#exists
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Labs/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#findById
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Labs/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#replaceById
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Labs/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#find
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Labs",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#findOne
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Labs/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#updateAll
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Labs/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#deleteById
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Labs/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#count
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Labs/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#prototype$patchAttributes
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Lab id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Lab` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Labs/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Lab#createChangeStream
                         * @methodOf lbServices.Lab
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Labs/change-stream",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.findById() instead.
                        "::findById::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.destroyById() instead.
                        "::destroyById::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.updateById() instead.
                        "::updateById::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.link() instead.
                        "::link::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.unlink() instead.
                        "::unlink::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.exists() instead.
                        "::exists::PlatformUser::tutorPossibleLabs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs() instead.
                        "::get::PlatformUser::tutorPossibleLabs": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "GET",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.create() instead.
                        "::create::PlatformUser::tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.createMany() instead.
                        "::createMany::PlatformUser::tutorPossibleLabs": {
                            isArray: true,
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "POST",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.destroyAll() instead.
                        "::delete::PlatformUser::tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs",
                            method: "DELETE",
                        },

                        // INTERNAL. Use PlatformUser.tutorPossibleLabs.count() instead.
                        "::count::PlatformUser::tutorPossibleLabs": {
                            url: urlBase + "/PlatformUsers/:id/tutorPossibleLabs/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.findById() instead.
                        "::findById::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.destroyById() instead.
                        "::destroyById::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.updateById() instead.
                        "::updateById::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.labs.link() instead.
                        "::link::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.labs.unlink() instead.
                        "::unlink::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.exists() instead.
                        "::exists::Group::labs": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/labs/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.labs() instead.
                        "::get::Group::labs": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/labs",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.labs.create() instead.
                        "::create::Group::labs": {
                            url: urlBase + "/Groups/:id/labs",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.labs.createMany() instead.
                        "::createMany::Group::labs": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/labs",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.labs.destroyAll() instead.
                        "::delete::Group::labs": {
                            url: urlBase + "/Groups/:id/labs",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.labs.count() instead.
                        "::count::Group::labs": {
                            url: urlBase + "/Groups/:id/labs/count",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.lab() instead.
                        "::get::Priority::lab": {
                            url: urlBase + "/Priorities/:id/lab",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.Lab#upsert
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#updateOrCreate
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#patchOrCreateWithWhere
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#update
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#destroyById
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#removeById
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#updateAttributes
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Lab id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.Lab#modelName
                 * @propertyOf lbServices.Lab
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `Lab`.
                 */
                R.modelName = "Lab";


                /**
                 * @ngdoc method
                 * @name lbServices.Lab#semester
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Lab id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::Lab::semester"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#group
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Fetches belongsTo relation group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Lab id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R.group = function() {
                    var TargetResource = $injector.get("Group");
                    var action = TargetResource["::get::Lab::group"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#tutor
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Fetches belongsTo relation tutor.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Lab id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PlatformUser` object.)
                 * </em>
                 */
                R.tutor = function() {
                    var TargetResource = $injector.get("PlatformUser");
                    var action = TargetResource["::get::Lab::tutor"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Lab#labType
                 * @methodOf lbServices.Lab
                 *
                 * @description
                 *
                 * Fetches belongsTo relation labType.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Lab id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R.labType = function() {
                    var TargetResource = $injector.get("LabType");
                    var action = TargetResource["::get::Lab::labType"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.Priority
     * @header lbServices.Priority
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `Priority` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "Priority",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/Priorities/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use Priority.group() instead.
                        "prototype$__get__group": {
                            url: urlBase + "/Priorities/:id/group",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.lab() instead.
                        "prototype$__get__lab": {
                            url: urlBase + "/Priorities/:id/lab",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/Priorities/:id/semester",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.labType() instead.
                        "prototype$__get__labType": {
                            url: urlBase + "/Priorities/:id/labType",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#create
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/Priorities",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#createMany
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/Priorities",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#patchOrCreate
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/Priorities",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#replaceOrCreate
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/Priorities/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#upsertWithWhere
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/Priorities/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#exists
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/Priorities/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#findById
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/Priorities/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#replaceById
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/Priorities/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#find
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/Priorities",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#findOne
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/Priorities/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#updateAll
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/Priorities/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#deleteById
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/Priorities/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#count
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/Priorities/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#prototype$patchAttributes
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Priority id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `Priority` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/Priorities/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.Priority#createChangeStream
                         * @methodOf lbServices.Priority
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/Priorities/change-stream",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.priorities.findById() instead.
                        "::findById::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.priorities.destroyById() instead.
                        "::destroyById::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.updateById() instead.
                        "::updateById::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.priorities.link() instead.
                        "::link::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "PUT",
                        },

                        // INTERNAL. Use Group.priorities.unlink() instead.
                        "::unlink::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.exists() instead.
                        "::exists::Group::priorities": {
                            params: {
                                'fk': '@fk',
                            },
                            url: urlBase + "/Groups/:id/priorities/rel/:fk",
                            method: "HEAD",
                        },

                        // INTERNAL. Use Group.priorities() instead.
                        "::get::Group::priorities": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/priorities",
                            method: "GET",
                        },

                        // INTERNAL. Use Group.priorities.create() instead.
                        "::create::Group::priorities": {
                            url: urlBase + "/Groups/:id/priorities",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.priorities.createMany() instead.
                        "::createMany::Group::priorities": {
                            isArray: true,
                            url: urlBase + "/Groups/:id/priorities",
                            method: "POST",
                        },

                        // INTERNAL. Use Group.priorities.destroyAll() instead.
                        "::delete::Group::priorities": {
                            url: urlBase + "/Groups/:id/priorities",
                            method: "DELETE",
                        },

                        // INTERNAL. Use Group.priorities.count() instead.
                        "::count::Group::priorities": {
                            url: urlBase + "/Groups/:id/priorities/count",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.Priority#upsert
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#updateOrCreate
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#patchOrCreateWithWhere
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#update
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#destroyById
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#removeById
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#updateAttributes
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Priority id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Priority` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.Priority#modelName
                 * @propertyOf lbServices.Priority
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `Priority`.
                 */
                R.modelName = "Priority";


                /**
                 * @ngdoc method
                 * @name lbServices.Priority#group
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Fetches belongsTo relation group.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Priority id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Group` object.)
                 * </em>
                 */
                R.group = function() {
                    var TargetResource = $injector.get("Group");
                    var action = TargetResource["::get::Priority::group"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#lab
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Fetches belongsTo relation lab.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Priority id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Lab` object.)
                 * </em>
                 */
                R.lab = function() {
                    var TargetResource = $injector.get("Lab");
                    var action = TargetResource["::get::Priority::lab"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#semester
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Priority id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::Priority::semester"];
                    return action.apply(R, arguments);
                };

                /**
                 * @ngdoc method
                 * @name lbServices.Priority#labType
                 * @methodOf lbServices.Priority
                 *
                 * @description
                 *
                 * Fetches belongsTo relation labType.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Priority id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R.labType = function() {
                    var TargetResource = $injector.get("LabType");
                    var action = TargetResource["::get::Priority::labType"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.LabType
     * @header lbServices.LabType
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `LabType` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "LabType",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/LabTypes/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use LabType.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/LabTypes/:id/semester",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#create
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/LabTypes",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#createMany
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/LabTypes",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#patchOrCreate
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/LabTypes",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#replaceOrCreate
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/LabTypes/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#upsertWithWhere
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/LabTypes/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#exists
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/LabTypes/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#findById
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/LabTypes/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#replaceById
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/LabTypes/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#find
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/LabTypes",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#findOne
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/LabTypes/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#updateAll
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/LabTypes/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#deleteById
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/LabTypes/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#count
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/LabTypes/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#prototype$patchAttributes
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - LabType id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/LabTypes/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#createChangeStream
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/LabTypes/change-stream",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.LabType#autoDistributeTutors
                         * @methodOf lbServices.LabType
                         *
                         * @description
                         *
                         * <em>
                         * (The remote method definition does not provide any description.)
                         * </em>
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `labTypeId` – `{string=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `LabType` object.)
                         * </em>
                         */
                        "autoDistributeTutors": {
                            url: urlBase + "/LabTypes/autoDistributeTutors",
                            method: "POST",
                        },

                        // INTERNAL. Use Lab.labType() instead.
                        "::get::Lab::labType": {
                            url: urlBase + "/Labs/:id/labType",
                            method: "GET",
                        },

                        // INTERNAL. Use Priority.labType() instead.
                        "::get::Priority::labType": {
                            url: urlBase + "/Priorities/:id/labType",
                            method: "GET",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.LabType#upsert
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#updateOrCreate
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#patchOrCreateWithWhere
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#update
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#destroyById
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#removeById
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.LabType#updateAttributes
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - LabType id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `LabType` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.LabType#modelName
                 * @propertyOf lbServices.LabType
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `LabType`.
                 */
                R.modelName = "LabType";


                /**
                 * @ngdoc method
                 * @name lbServices.LabType#semester
                 * @methodOf lbServices.LabType
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - LabType id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::LabType::semester"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.PendingPlatformUser
     * @header lbServices.PendingPlatformUser
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `PendingPlatformUser` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "PendingPlatformUser",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/PendingPlatformUsers/:id",
                    { 'id': '@id' },
                    {

                        // INTERNAL. Use PendingPlatformUser.semester() instead.
                        "prototype$__get__semester": {
                            url: urlBase + "/PendingPlatformUsers/:id/semester",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#create
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/PendingPlatformUsers",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#createMany
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/PendingPlatformUsers",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#patchOrCreate
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/PendingPlatformUsers",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#replaceOrCreate
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/PendingPlatformUsers/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#upsertWithWhere
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/PendingPlatformUsers/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#exists
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/PendingPlatformUsers/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#findById
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/PendingPlatformUsers/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#replaceById
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/PendingPlatformUsers/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#find
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/PendingPlatformUsers",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#findOne
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/PendingPlatformUsers/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#updateAll
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/PendingPlatformUsers/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#deleteById
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/PendingPlatformUsers/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#count
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/PendingPlatformUsers/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#prototype$patchAttributes
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - PendingPlatformUser id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `PendingPlatformUser` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/PendingPlatformUsers/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.PendingPlatformUser#createChangeStream
                         * @methodOf lbServices.PendingPlatformUser
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/PendingPlatformUsers/change-stream",
                            method: "POST",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#upsert
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#updateOrCreate
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#patchOrCreateWithWhere
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#update
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#destroyById
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#removeById
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#updateAttributes
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PendingPlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `PendingPlatformUser` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.PendingPlatformUser#modelName
                 * @propertyOf lbServices.PendingPlatformUser
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `PendingPlatformUser`.
                 */
                R.modelName = "PendingPlatformUser";


                /**
                 * @ngdoc method
                 * @name lbServices.PendingPlatformUser#semester
                 * @methodOf lbServices.PendingPlatformUser
                 *
                 * @description
                 *
                 * Fetches belongsTo relation semester.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - PendingPlatformUser id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `refresh` – `{boolean=}` -
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `Semester` object.)
                 * </em>
                 */
                R.semester = function() {
                    var TargetResource = $injector.get("Semester");
                    var action = TargetResource["::get::PendingPlatformUser::semester"];
                    return action.apply(R, arguments);
                };


                return R;
            }]);

    /**
     * @ngdoc object
     * @name lbServices.NewsEntry
     * @header lbServices.NewsEntry
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `NewsEntry` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    module.factory(
        "NewsEntry",
        [
            'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
            function(LoopBackResource, LoopBackAuth, $injector, $q) {
                var R = LoopBackResource(
                    urlBase + "/NewsEntries/:id",
                    { 'id': '@id' },
                    {

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#create
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "create": {
                            url: urlBase + "/NewsEntries",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#createMany
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Create a new instance of the model and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "createMany": {
                            isArray: true,
                            url: urlBase + "/NewsEntries",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#patchOrCreate
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Patch an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "patchOrCreate": {
                            url: urlBase + "/NewsEntries",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#replaceOrCreate
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Replace an existing model instance or insert a new one into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "replaceOrCreate": {
                            url: urlBase + "/NewsEntries/replaceOrCreate",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#upsertWithWhere
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Update an existing model instance or insert a new one into the data source based on the where criteria.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "upsertWithWhere": {
                            url: urlBase + "/NewsEntries/upsertWithWhere",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#exists
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Check whether a model instance exists in the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `exists` – `{boolean=}` -
                         */
                        "exists": {
                            url: urlBase + "/NewsEntries/:id/exists",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#findById
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Find a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "findById": {
                            url: urlBase + "/NewsEntries/:id",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#replaceById
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Replace attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - Model instance data
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "replaceById": {
                            url: urlBase + "/NewsEntries/:id/replace",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#find
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Find all instances of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Array.<Object>,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Array.<Object>} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "find": {
                            isArray: true,
                            url: urlBase + "/NewsEntries",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#findOne
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Find first instance of the model matched by filter from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "findOne": {
                            url: urlBase + "/NewsEntries/findOne",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#updateAll
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Update instances of the model matched by {{where}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Information related to the outcome of the operation
                         */
                        "updateAll": {
                            url: urlBase + "/NewsEntries/update",
                            method: "POST",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#deleteById
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Delete a model instance by {{id}} from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - Model id
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "deleteById": {
                            url: urlBase + "/NewsEntries/:id",
                            method: "DELETE",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#count
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Count instances of the model matched by where from the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `where` – `{object=}` - Criteria to match model instances
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `count` – `{number=}` -
                         */
                        "count": {
                            url: urlBase + "/NewsEntries/count",
                            method: "GET",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#prototype$patchAttributes
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Patch attributes for a model instance and persist it into the data source.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *  - `id` – `{*}` - NewsEntry id
                         *
                         *  - `options` – `{object=}` -
                         *
                         *  - `data` – `{object=}` - An object of model property name/value pairs
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * <em>
                         * (The remote method definition does not provide any description.
                         * This usually means the response is a `NewsEntry` object.)
                         * </em>
                         */
                        "prototype$patchAttributes": {
                            url: urlBase + "/NewsEntries/:id",
                            method: "PATCH",
                        },

                        /**
                         * @ngdoc method
                         * @name lbServices.NewsEntry#createChangeStream
                         * @methodOf lbServices.NewsEntry
                         *
                         * @description
                         *
                         * Create a change stream.
                         *
                         * @param {Object=} parameters Request parameters.
                         *
                         *   This method does not accept any parameters.
                         *   Supply an empty object or omit this argument altogether.
                         *
                         * @param {Object} postData Request data.
                         *
                         *  - `options` – `{object=}` -
                         *
                         * @param {function(Object,Object)=} successCb
                         *   Success callback with two arguments: `value`, `responseHeaders`.
                         *
                         * @param {function(Object)=} errorCb Error callback with one argument:
                         *   `httpResponse`.
                         *
                         * @returns {Object} An empty reference that will be
                         *   populated with the actual data once the response is returned
                         *   from the server.
                         *
                         * Data properties:
                         *
                         *  - `changes` – `{ReadableStream=}` -
                         */
                        "createChangeStream": {
                            url: urlBase + "/NewsEntries/change-stream",
                            method: "POST",
                        },
                    }
                );



                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#upsert
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["upsert"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#updateOrCreate
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Patch an existing model instance or insert a new one into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `data` – `{object=}` - Model instance data
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["updateOrCreate"] = R["patchOrCreate"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#patchOrCreateWithWhere
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Update an existing model instance or insert a new one into the data source based on the where criteria.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#update
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Update instances of the model matched by {{where}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `where` – `{object=}` - Criteria to match model instances
                 *
                 * @param {Object} postData Request data.
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * Information related to the outcome of the operation
                 */
                R["update"] = R["updateAll"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#destroyById
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["destroyById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#removeById
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Delete a model instance by {{id}} from the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - Model id
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["removeById"] = R["deleteById"];

                /**
                 * @ngdoc method
                 * @name lbServices.NewsEntry#updateAttributes
                 * @methodOf lbServices.NewsEntry
                 *
                 * @description
                 *
                 * Patch attributes for a model instance and persist it into the data source.
                 *
                 * @param {Object=} parameters Request parameters.
                 *
                 *  - `id` – `{*}` - NewsEntry id
                 *
                 *  - `options` – `{object=}` -
                 *
                 *  - `data` – `{object=}` - An object of model property name/value pairs
                 *
                 *  - `options` – `{object=}` -
                 *
                 * @param {function(Object,Object)=} successCb
                 *   Success callback with two arguments: `value`, `responseHeaders`.
                 *
                 * @param {function(Object)=} errorCb Error callback with one argument:
                 *   `httpResponse`.
                 *
                 * @returns {Object} An empty reference that will be
                 *   populated with the actual data once the response is returned
                 *   from the server.
                 *
                 * <em>
                 * (The remote method definition does not provide any description.
                 * This usually means the response is a `NewsEntry` object.)
                 * </em>
                 */
                R["updateAttributes"] = R["prototype$patchAttributes"];


                /**
                 * @ngdoc property
                 * @name lbServices.NewsEntry#modelName
                 * @propertyOf lbServices.NewsEntry
                 * @description
                 * The name of the model represented by this $resource,
                 * i.e. `NewsEntry`.
                 */
                R.modelName = "NewsEntry";



                return R;
            }]);


    module
        .factory('LoopBackAuth', function() {
            var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
            var propsPrefix = '$LoopBack$';

            function LoopBackAuth() {
                var self = this;
                props.forEach(function(name) {
                    self[name] = load(name);
                });
                this.currentUserData = null;
            }

            LoopBackAuth.prototype.save = function() {
                var self = this;
                var storage = this.rememberMe ? localStorage : sessionStorage;
                props.forEach(function(name) {
                    save(storage, name, self[name]);
                });
            };

            LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
                this.accessTokenId = accessTokenId;
                this.currentUserId = userId;
                this.currentUserData = userData;
            };

            LoopBackAuth.prototype.clearUser = function() {
                this.accessTokenId = null;
                this.currentUserId = null;
                this.currentUserData = null;
            };

            LoopBackAuth.prototype.clearStorage = function() {
                props.forEach(function(name) {
                    save(sessionStorage, name, null);
                    save(localStorage, name, null);
                });
            };

            return new LoopBackAuth();

            // Note: LocalStorage converts the value to string
            // We are using empty string as a marker for null/undefined values.
            function save(storage, name, value) {
                try {
                    var key = propsPrefix + name;
                    if (value == null) value = '';
                    storage[key] = value;
                } catch (err) {
                    console.log('Cannot access local/session storage:', err);
                }
            }

            function load(name) {
                var key = propsPrefix + name;
                return localStorage[key] || sessionStorage[key] || null;
            }
        })
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
        }])
        .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
            function($q, LoopBackAuth) {
                return {
                    'request': function(config) {
                        // filter out external requests
                        var host = getHost(config.url);
                        if (host && host !== urlBaseHost) {
                            return config;
                        }

                        if (LoopBackAuth.accessTokenId) {
                            config.headers[authHeader] = LoopBackAuth.accessTokenId;
                        } else if (config.__isGetCurrentUser__) {
                            // Return a stub 401 error for User.getCurrent() when
                            // there is no user logged in
                            var res = {
                                body: { error: { status: 401 }},
                                status: 401,
                                config: config,
                                headers: function() { return undefined; },
                            };
                            return $q.reject(res);
                        }
                        return config || $q.when(config);
                    },
                };
            }])

        /**
         * @ngdoc object
         * @name lbServices.LoopBackResourceProvider
         * @header lbServices.LoopBackResourceProvider
         * @description
         * Use `LoopBackResourceProvider` to change the global configuration
         * settings used by all models. Note that the provider is available
         * to Configuration Blocks only, see
         * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
         * for more details.
         *
         * ## Example
         *
         * ```js
         * angular.module('app')
         *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
         * ```
         */
        .provider('LoopBackResource', function LoopBackResourceProvider() {
            /**
             * @ngdoc method
             * @name lbServices.LoopBackResourceProvider#setAuthHeader
             * @methodOf lbServices.LoopBackResourceProvider
             * @param {string} header The header name to use, e.g. `X-Access-Token`
             * @description
             * Configure the REST transport to use a different header for sending
             * the authentication token. It is sent in the `Authorization` header
             * by default.
             */
            this.setAuthHeader = function(header) {
                authHeader = header;
            };

            /**
             * @ngdoc method
             * @name lbServices.LoopBackResourceProvider#getAuthHeader
             * @methodOf lbServices.LoopBackResourceProvider
             * @description
             * Get the header name that is used for sending the authentication token.
             */
            this.getAuthHeader = function() {
                return authHeader;
            };

            /**
             * @ngdoc method
             * @name lbServices.LoopBackResourceProvider#setUrlBase
             * @methodOf lbServices.LoopBackResourceProvider
             * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
             * @description
             * Change the URL of the REST API server. By default, the URL provided
             * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
             */
            this.setUrlBase = function(url) {
                urlBase = url;
                urlBaseHost = getHost(urlBase) || location.host;
            };

            /**
             * @ngdoc method
             * @name lbServices.LoopBackResourceProvider#getUrlBase
             * @methodOf lbServices.LoopBackResourceProvider
             * @description
             * Get the URL of the REST API server. The URL provided
             * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
             */
            this.getUrlBase = function() {
                return urlBase;
            };

            this.$get = ['$resource', function($resource) {
                var LoopBackResource = function(url, params, actions) {
                    var resource = $resource(url, params, actions);

                    // Angular always calls POST on $save()
                    // This hack is based on
                    // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
                    resource.prototype.$save = function(success, error) {
                        // Fortunately, LoopBack provides a convenient `upsert` method
                        // that exactly fits our needs.
                        var result = resource.upsert.call(this, {}, this, success, error);
                        return result.$promise || result;
                    };
                    return resource;
                };

                LoopBackResource.getUrlBase = function() {
                    return urlBase;
                };

                LoopBackResource.getAuthHeader = function() {
                    return authHeader;
                };

                return LoopBackResource;
            }];
        });
})(window, window.angular);
