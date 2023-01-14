"use strict";
(self["webpackChunkwarbotter_client"] = self["webpackChunkwarbotter_client"] || []).push([["main"],{

/***/ 9042:
/*!**********************************!*\
  !*** ./src/api/core/ApiError.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiError": () => (/* binding */ ApiError)
/* harmony export */ });
class ApiError extends Error {
  constructor(request, response, message) {
    super(message);
    this.name = 'ApiError';
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request;
  }
}

/***/ }),

/***/ 7670:
/*!*******************************************!*\
  !*** ./src/api/core/CancelablePromise.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelError": () => (/* binding */ CancelError),
/* harmony export */   "CancelablePromise": () => (/* binding */ CancelablePromise)
/* harmony export */ });
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
class CancelError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelError';
  }
  get isCancelled() {
    return true;
  }
}
class CancelablePromise {
  constructor(executor) {
    this._isResolved = false;
    this._isRejected = false;
    this._isCancelled = false;
    this._cancelHandlers = [];
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      const onResolve = value => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isResolved = true;
        this._resolve?.(value);
      };
      const onReject = reason => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isRejected = true;
        this._reject?.(reason);
      };
      const onCancel = cancelHandler => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, 'isResolved', {
        get: () => this._isResolved
      });
      Object.defineProperty(onCancel, 'isRejected', {
        get: () => this._isRejected
      });
      Object.defineProperty(onCancel, 'isCancelled', {
        get: () => this._isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  finally(onFinally) {
    return this._promise.finally(onFinally);
  }
  cancel() {
    if (this._isResolved || this._isRejected || this._isCancelled) {
      return;
    }
    this._isCancelled = true;
    if (this._cancelHandlers.length) {
      try {
        for (const cancelHandler of this._cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn('Cancellation threw an error', error);
        return;
      }
    }
    this._cancelHandlers.length = 0;
    this._reject?.(new CancelError('Request aborted'));
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
Symbol.toStringTag;

/***/ }),

/***/ 1458:
/*!*********************************!*\
  !*** ./src/api/core/OpenAPI.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenAPI": () => (/* binding */ OpenAPI)
/* harmony export */ });
const OpenAPI = {
  BASE: '',
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined
};

/***/ }),

/***/ 8155:
/*!*********************************!*\
  !*** ./src/api/core/request.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "request": () => (/* binding */ request),
/* harmony export */   "sendRequest": () => (/* binding */ sendRequest)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var _ApiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ApiError */ 9042);

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */




const isDefined = value => {
  return value !== undefined && value !== null;
};
const isString = value => {
  return typeof value === 'string';
};
const isStringWithValue = value => {
  return isString(value) && value !== '';
};
const isBlob = value => {
  return typeof value === 'object' && typeof value.type === 'string' && typeof value.stream === 'function' && typeof value.arrayBuffer === 'function' && typeof value.constructor === 'function' && typeof value.constructor.name === 'string' && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
const isFormData = value => {
  return value instanceof FormData;
};
const base64 = str => {
  try {
    return btoa(str);
  } catch (err) {
    // @ts-ignore
    return Buffer.from(str).toString('base64');
  }
};
const getQueryString = params => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          process(key, v);
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }
  return '';
};
const getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace('{api-version}', config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    if (options.path?.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
const getFormData = options => {
  if (options.formData) {
    const formData = new FormData();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return undefined;
};
const resolve = /*#__PURE__*/function () {
  var _ref = (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (options, resolver) {
    if (typeof resolver === 'function') {
      return resolver(options);
    }
    return resolver;
  });
  return function resolve(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
const getHeaders = (config, options) => {
  return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)({
    token: resolve(options, config.TOKEN),
    username: resolve(options, config.USERNAME),
    password: resolve(options, config.PASSWORD),
    additionalHeaders: resolve(options, config.HEADERS)
  }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(({
    token,
    username,
    password,
    additionalHeaders
  }) => {
    const headers = Object.entries({
      Accept: 'application/json',
      ...additionalHeaders,
      ...options.headers
    }).filter(([_, value]) => isDefined(value)).reduce((headers, [key, value]) => ({
      ...headers,
      [key]: String(value)
    }), {});
    if (isStringWithValue(token)) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (isStringWithValue(username) && isStringWithValue(password)) {
      const credentials = base64(`${username}:${password}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }
    if (options.body) {
      if (options.mediaType) {
        headers['Content-Type'] = options.mediaType;
      } else if (isBlob(options.body)) {
        headers['Content-Type'] = options.body.type || 'application/octet-stream';
      } else if (isString(options.body)) {
        headers['Content-Type'] = 'text/plain';
      } else if (!isFormData(options.body)) {
        headers['Content-Type'] = 'application/json';
      }
    }
    return new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders(headers);
  }));
};
const getRequestBody = options => {
  if (options.body) {
    if (options.mediaType?.includes('/json')) {
      return JSON.stringify(options.body);
    } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body;
    } else {
      return JSON.stringify(options.body);
    }
  }
  return undefined;
};
const sendRequest = (config, options, http, url, body, formData, headers) => {
  return http.request(options.method, url, {
    headers,
    body: body ?? formData,
    withCredentials: config.WITH_CREDENTIALS,
    observe: 'response'
  });
};
const getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const value = response.headers.get(responseHeader);
    if (isString(value)) {
      return value;
    }
  }
  return undefined;
};
const getResponseBody = response => {
  if (response.status !== 204 && response.body !== null) {
    return response.body;
  }
  return undefined;
};
const catchErrorCodes = (options, result) => {
  const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    ...options.errors
  };
  const error = errors[result.status];
  if (error) {
    throw new _ApiError__WEBPACK_IMPORTED_MODULE_1__.ApiError(options, result, error);
  }
  if (!result.ok) {
    throw new _ApiError__WEBPACK_IMPORTED_MODULE_1__.ApiError(options, result, 'Generic Error');
  }
};
/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param http The Angular HTTP client
 * @param options The request options from the service
 * @returns Observable<T>
 * @throws ApiError
 */
const request = (config, http, options) => {
  const url = getUrl(config, options);
  const formData = getFormData(options);
  const body = getRequestBody(options);
  return getHeaders(config, options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(headers => {
    return sendRequest(config, options, http, url, formData, body, headers);
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
    const responseBody = getResponseBody(response);
    const responseHeader = getResponseHeader(response, options.responseHeader);
    return {
      url,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      body: responseHeader ?? responseBody
    };
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
    if (!error.status) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)({
      url,
      ok: error.ok,
      status: error.status,
      statusText: error.statusText,
      body: error.error ?? error.statusText
    });
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(result => {
    catchErrorCodes(options, result);
    return result.body;
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error);
  }));
};

/***/ }),

/***/ 3889:
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiError": () => (/* reexport safe */ _core_ApiError__WEBPACK_IMPORTED_MODULE_0__.ApiError),
/* harmony export */   "AuthService": () => (/* reexport safe */ _services_AuthService__WEBPACK_IMPORTED_MODULE_6__.AuthService),
/* harmony export */   "CampaignsService": () => (/* reexport safe */ _services_CampaignsService__WEBPACK_IMPORTED_MODULE_7__.CampaignsService),
/* harmony export */   "CancelError": () => (/* reexport safe */ _core_CancelablePromise__WEBPACK_IMPORTED_MODULE_1__.CancelError),
/* harmony export */   "CancelablePromise": () => (/* reexport safe */ _core_CancelablePromise__WEBPACK_IMPORTED_MODULE_1__.CancelablePromise),
/* harmony export */   "DefaultService": () => (/* reexport safe */ _services_DefaultService__WEBPACK_IMPORTED_MODULE_8__.DefaultService),
/* harmony export */   "ExportedEnums": () => (/* reexport safe */ _models_ExportedEnums__WEBPACK_IMPORTED_MODULE_3__.ExportedEnums),
/* harmony export */   "HeroesService": () => (/* reexport safe */ _services_HeroesService__WEBPACK_IMPORTED_MODULE_9__.HeroesService),
/* harmony export */   "ItemsService": () => (/* reexport safe */ _services_ItemsService__WEBPACK_IMPORTED_MODULE_10__.ItemsService),
/* harmony export */   "ModifierDto": () => (/* reexport safe */ _models_ModifierDto__WEBPACK_IMPORTED_MODULE_4__.ModifierDto),
/* harmony export */   "MusicBotService": () => (/* reexport safe */ _services_MusicBotService__WEBPACK_IMPORTED_MODULE_11__.MusicBotService),
/* harmony export */   "OpenAPI": () => (/* reexport safe */ _core_OpenAPI__WEBPACK_IMPORTED_MODULE_2__.OpenAPI),
/* harmony export */   "ProfessionsService": () => (/* reexport safe */ _services_ProfessionsService__WEBPACK_IMPORTED_MODULE_12__.ProfessionsService),
/* harmony export */   "SkillsService": () => (/* reexport safe */ _services_SkillsService__WEBPACK_IMPORTED_MODULE_13__.SkillsService),
/* harmony export */   "TalentsService": () => (/* reexport safe */ _services_TalentsService__WEBPACK_IMPORTED_MODULE_14__.TalentsService),
/* harmony export */   "User": () => (/* reexport safe */ _models_User__WEBPACK_IMPORTED_MODULE_5__.User),
/* harmony export */   "UsersService": () => (/* reexport safe */ _services_UsersService__WEBPACK_IMPORTED_MODULE_15__.UsersService)
/* harmony export */ });
/* harmony import */ var _core_ApiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/ApiError */ 9042);
/* harmony import */ var _core_CancelablePromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/CancelablePromise */ 7670);
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/OpenAPI */ 1458);
/* harmony import */ var _models_ExportedEnums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/ExportedEnums */ 6733);
/* harmony import */ var _models_ModifierDto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/ModifierDto */ 2905);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/User */ 415);
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/AuthService */ 5854);
/* harmony import */ var _services_CampaignsService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/CampaignsService */ 2481);
/* harmony import */ var _services_DefaultService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/DefaultService */ 8794);
/* harmony import */ var _services_HeroesService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/HeroesService */ 1186);
/* harmony import */ var _services_ItemsService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/ItemsService */ 6678);
/* harmony import */ var _services_MusicBotService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/MusicBotService */ 5796);
/* harmony import */ var _services_ProfessionsService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/ProfessionsService */ 4336);
/* harmony import */ var _services_SkillsService__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/SkillsService */ 5750);
/* harmony import */ var _services_TalentsService__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/TalentsService */ 4401);
/* harmony import */ var _services_UsersService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/UsersService */ 6703);
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

















/***/ }),

/***/ 6733:
/*!*****************************************!*\
  !*** ./src/api/models/ExportedEnums.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExportedEnums": () => (/* binding */ ExportedEnums)
/* harmony export */ });
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var ExportedEnums;
(function (ExportedEnums) {
  let baseStats;
  (function (baseStats) {
    baseStats["WW"] = "WW";
    baseStats["US"] = "US";
    baseStats["K"] = "K";
    baseStats["ODP"] = "ODP";
    baseStats["ZR"] = "ZR";
    baseStats["INT"] = "INT";
    baseStats["SW"] = "SW";
    baseStats["OGD"] = "OGD";
  })(baseStats = ExportedEnums.baseStats || (ExportedEnums.baseStats = {}));
  let secondaryStats;
  (function (secondaryStats) {
    secondaryStats["A"] = "A";
    secondaryStats["_YW"] = "\u017BYW";
    secondaryStats["S"] = "S";
    secondaryStats["WT"] = "WT";
    secondaryStats["SZ"] = "SZ";
    secondaryStats["MAG"] = "MAG";
    secondaryStats["PO"] = "PO";
    secondaryStats["PP"] = "PP";
  })(secondaryStats = ExportedEnums.secondaryStats || (ExportedEnums.secondaryStats = {}));
})(ExportedEnums || (ExportedEnums = {}));

/***/ }),

/***/ 2905:
/*!***************************************!*\
  !*** ./src/api/models/ModifierDto.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModifierDto": () => (/* binding */ ModifierDto)
/* harmony export */ });
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var ModifierDto;
(function (ModifierDto) {
  let type;
  (function (type) {
    type["BASE_STAT_INCREASE"] = "baseStatIncrease";
    type["RANGED_DMG_INCREASE"] = "rangedDmgIncrease";
    type["MELEE_DMG_INCREASE"] = "meleeDmgIncrease";
    type["ALL_DMG_INCREASE"] = "allDmgIncrease";
    type["SKILL_TEST_MODIFIER"] = "skillTestModifier";
    type["BASE_STAT_TEST_MODIFIER"] = "BaseStatTestModifier";
    type["SECONDARY_STAT_MODIFIER"] = "secondaryStatModifier";
  })(type = ModifierDto.type || (ModifierDto.type = {}));
})(ModifierDto || (ModifierDto = {}));

/***/ }),

/***/ 415:
/*!********************************!*\
  !*** ./src/api/models/User.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User)
/* harmony export */ });
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var User;
(function (User) {
  let role;
  (function (role) {
    role["USER"] = "User";
    role["GM"] = "GM";
    role["ADMIN"] = "Admin";
  })(role = User.role || (User.role = {}));
})(User || (User = {}));

/***/ }),

/***/ 5854:
/*!*****************************************!*\
  !*** ./src/api/services/AuthService.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class AuthService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  authControllerLogin(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/auth/login',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
AuthService.ɵfac = function AuthService_Factory(t) {
  return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthService,
  factory: AuthService.ɵfac
});

/***/ }),

/***/ 2481:
/*!**********************************************!*\
  !*** ./src/api/services/CampaignsService.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CampaignsService": () => (/* binding */ CampaignsService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class CampaignsService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  campaignsControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/campaigns',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns string
   * @throws ApiError
   */
  campaignsControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/campaigns'
    });
  }
  /**
   * @param channelId
   * @param campaignCode
   * @returns any
   * @throws ApiError
   */
  campaignsControllerUpdateChannel(channelId, campaignCode) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/campaigns/update-channel',
      query: {
        'channelId': channelId,
        'campaignCode': campaignCode
      }
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  campaignsControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/campaigns/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns string
   * @throws ApiError
   */
  campaignsControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/campaigns/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  campaignsControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/campaigns/{id}',
      path: {
        'id': id
      }
    });
  }
}
CampaignsService.ɵfac = function CampaignsService_Factory(t) {
  return new (t || CampaignsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
CampaignsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CampaignsService,
  factory: CampaignsService.ɵfac
});

/***/ }),

/***/ 8794:
/*!********************************************!*\
  !*** ./src/api/services/DefaultService.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultService": () => (/* binding */ DefaultService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class DefaultService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  appControllerExportedEnums(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  appControllerTestBot() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/test-bot'
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  appControllerUpdateCommands() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/update-commands'
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  appControllerInteractions() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/interactions'
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  appControllerSendMessage() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/send'
    });
  }
}
DefaultService.ɵfac = function DefaultService_Factory(t) {
  return new (t || DefaultService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
DefaultService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: DefaultService,
  factory: DefaultService.ɵfac
});

/***/ }),

/***/ 1186:
/*!*******************************************!*\
  !*** ./src/api/services/HeroesService.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeroesService": () => (/* binding */ HeroesService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class HeroesService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns Hero
   * @throws ApiError
   */
  heroControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/hero',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns Hero
   * @throws ApiError
   */
  heroControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/hero'
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  heroControllerTest() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/hero/test'
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  heroControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/hero/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns string
   * @throws ApiError
   */
  heroControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/hero/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  heroControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/hero/{id}',
      path: {
        'id': id
      }
    });
  }
}
HeroesService.ɵfac = function HeroesService_Factory(t) {
  return new (t || HeroesService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
HeroesService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: HeroesService,
  factory: HeroesService.ɵfac
});

/***/ }),

/***/ 6678:
/*!******************************************!*\
  !*** ./src/api/services/ItemsService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemsService": () => (/* binding */ ItemsService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class ItemsService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns string
   * @throws ApiError
   */
  itemControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/item',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns string
   * @throws ApiError
   */
  itemControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/item'
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  itemControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/item/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns string
   * @throws ApiError
   */
  itemControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/item/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns string
   * @throws ApiError
   */
  itemControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/item/{id}',
      path: {
        'id': id
      }
    });
  }
}
ItemsService.ɵfac = function ItemsService_Factory(t) {
  return new (t || ItemsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
ItemsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ItemsService,
  factory: ItemsService.ɵfac
});

/***/ }),

/***/ 5796:
/*!*********************************************!*\
  !*** ./src/api/services/MusicBotService.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MusicBotService": () => (/* binding */ MusicBotService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class MusicBotService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param videoId
   * @param loop
   * @param startSeconds
   * @param endSeconds
   * @returns string
   * @throws ApiError
   */
  musicBotControllerPing(videoId, loop, startSeconds, endSeconds) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/music-bot',
      query: {
        'videoId': videoId,
        'loop': loop,
        'startSeconds': startSeconds,
        'endSeconds': endSeconds
      }
    });
  }
}
MusicBotService.ɵfac = function MusicBotService_Factory(t) {
  return new (t || MusicBotService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
MusicBotService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: MusicBotService,
  factory: MusicBotService.ɵfac
});

/***/ }),

/***/ 4336:
/*!************************************************!*\
  !*** ./src/api/services/ProfessionsService.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfessionsService": () => (/* binding */ ProfessionsService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class ProfessionsService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns Profession
   * @throws ApiError
   */
  professionControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/profession',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns Profession
   * @throws ApiError
   */
  professionControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/profession'
    });
  }
  /**
   * @param id
   * @returns Profession
   * @throws ApiError
   */
  professionControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/profession/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns Profession
   * @throws ApiError
   */
  professionControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/profession/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  professionControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/profession/{id}',
      path: {
        'id': id
      }
    });
  }
}
ProfessionsService.ɵfac = function ProfessionsService_Factory(t) {
  return new (t || ProfessionsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
ProfessionsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProfessionsService,
  factory: ProfessionsService.ɵfac
});

/***/ }),

/***/ 5750:
/*!*******************************************!*\
  !*** ./src/api/services/SkillsService.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillsService": () => (/* binding */ SkillsService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class SkillsService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns Skill
   * @throws ApiError
   */
  skillControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/skill',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns Skill
   * @throws ApiError
   */
  skillControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/skill'
    });
  }
  /**
   * @returns string
   * @throws ApiError
   */
  skillControllerTest() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/skill/test'
    });
  }
  /**
   * @param id
   * @returns Skill
   * @throws ApiError
   */
  skillControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/skill/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns Skill
   * @throws ApiError
   */
  skillControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/skill/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  skillControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/skill/{id}',
      path: {
        'id': id
      }
    });
  }
}
SkillsService.ɵfac = function SkillsService_Factory(t) {
  return new (t || SkillsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
SkillsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: SkillsService,
  factory: SkillsService.ɵfac
});

/***/ }),

/***/ 4401:
/*!********************************************!*\
  !*** ./src/api/services/TalentsService.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TalentsService": () => (/* binding */ TalentsService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class TalentsService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns Talent
   * @throws ApiError
   */
  talentControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/talent',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns Talent
   * @throws ApiError
   */
  talentControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/talent'
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  talentControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/talent/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns Talent
   * @throws ApiError
   */
  talentControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/talent/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  talentControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/talent/{id}',
      path: {
        'id': id
      }
    });
  }
}
TalentsService.ɵfac = function TalentsService_Factory(t) {
  return new (t || TalentsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
TalentsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: TalentsService,
  factory: TalentsService.ɵfac
});

/***/ }),

/***/ 6703:
/*!******************************************!*\
  !*** ./src/api/services/UsersService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersService": () => (/* binding */ UsersService)
/* harmony export */ });
/* harmony import */ var _core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/OpenAPI */ 1458);
/* harmony import */ var _core_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/request */ 8155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);




class UsersService {
  constructor(http) {
    this.http = http;
  }
  /**
   * @param requestBody
   * @returns User
   * @throws ApiError
   */
  usersControllerCreate(requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'POST',
      url: '/api/users',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  usersControllerFindAll() {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/users'
    });
  }
  /**
   * @param id
   * @returns User
   * @throws ApiError
   */
  usersControllerFindOne(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'GET',
      url: '/api/users/{id}',
      path: {
        'id': id
      }
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns User
   * @throws ApiError
   */
  usersControllerUpdate(id, requestBody) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'PATCH',
      url: '/api/users/{id}',
      path: {
        'id': id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
  /**
   * @param id
   * @returns User
   * @throws ApiError
   */
  usersControllerRemove(id) {
    return (0,_core_request__WEBPACK_IMPORTED_MODULE_1__.request)(_core_OpenAPI__WEBPACK_IMPORTED_MODULE_0__.OpenAPI, this.http, {
      method: 'DELETE',
      url: '/api/users/{id}',
      path: {
        'id': id
      }
    });
  }
}
UsersService.ɵfac = function UsersService_Factory(t) {
  return new (t || UsersService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
UsersService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: UsersService,
  factory: UsersService.ɵfac
});

/***/ }),

/***/ 5283:
/*!*********************************************************!*\
  !*** ./src/app/administration/administration.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdministrationModule": () => (/* binding */ AdministrationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _talent_management_talent_management_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./talent-management/talent-management.component */ 8956);
/* harmony import */ var _skill_management_skill_management_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./skill-management/skill-management.component */ 8734);
/* harmony import */ var _profession_management_profession_management_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profession-management/profession-management.component */ 7083);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _talent_management_create_talent_create_talent_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./talent-management/create-talent/create-talent.component */ 6053);
/* harmony import */ var _talent_management_update_talent_update_talent_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./talent-management/update-talent/update-talent.component */ 7533);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _skill_management_crud_update_skill_update_skill_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./skill-management/crud/update-skill/update-skill.component */ 7340);
/* harmony import */ var _skill_management_crud_create_skill_create_skill_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./skill-management/crud/create-skill/create-skill.component */ 5779);
/* harmony import */ var _skill_management_crud_skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./skill-management/crud/skill-form/skill-form.component */ 4995);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/checkbox */ 4792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);


















class AdministrationModule {}
AdministrationModule.ɵfac = function AdministrationModule_Factory(t) {
  return new (t || AdministrationModule)();
};
AdministrationModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: AdministrationModule
});
AdministrationModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCardModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButtonModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__.MatDialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__.MatCheckboxModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AdministrationModule, {
    declarations: [_talent_management_talent_management_component__WEBPACK_IMPORTED_MODULE_0__.TalentManagementComponent, _skill_management_skill_management_component__WEBPACK_IMPORTED_MODULE_1__.SkillManagementComponent, _profession_management_profession_management_component__WEBPACK_IMPORTED_MODULE_2__.ProfessionManagementComponent, _talent_management_create_talent_create_talent_component__WEBPACK_IMPORTED_MODULE_3__.CreateTalentComponent, _talent_management_update_talent_update_talent_component__WEBPACK_IMPORTED_MODULE_4__.UpdateTalentComponent, _skill_management_crud_update_skill_update_skill_component__WEBPACK_IMPORTED_MODULE_5__.UpdateSkillComponent, _skill_management_crud_create_skill_create_skill_component__WEBPACK_IMPORTED_MODULE_6__.CreateSkillComponent, _skill_management_crud_skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_7__.SkillFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCardModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButtonModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__.MatDialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__.MatCheckboxModule]
  });
})();

/***/ }),

/***/ 7083:
/*!*****************************************************************************************!*\
  !*** ./src/app/administration/profession-management/profession-management.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfessionManagementComponent": () => (/* binding */ ProfessionManagementComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class ProfessionManagementComponent {}
ProfessionManagementComponent.ɵfac = function ProfessionManagementComponent_Factory(t) {
  return new (t || ProfessionManagementComponent)();
};
ProfessionManagementComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ProfessionManagementComponent,
  selectors: [["app-profession-management"]],
  decls: 2,
  vars: 0,
  template: function ProfessionManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "profession-management works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9mZXNzaW9uLW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceURL=webpack://./src/app/administration/profession-management/profession-management.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vcHJvZmVzc2lvbi1tYW5hZ2VtZW50L3Byb2Zlc3Npb24tbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0xBQXdMIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 5779:
/*!*********************************************************************************************!*\
  !*** ./src/app/administration/skill-management/crud/create-skill/create-skill.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateSkillComponent": () => (/* binding */ CreateSkillComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../skill-form/skill-form.component */ 4995);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 1484);





class CreateSkillComponent {
  constructor(dialog) {
    this.dialog = dialog;
    this.dataFromModal = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
  }
  openCreateDialog() {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.dialog.open(_skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_1__.SkillFormComponent, {
        data: {
          mode: 'create',
          emitter: _this.dataFromModal
        },
        width: '70%'
      });
    })();
  }
}
CreateSkillComponent.ɵfac = function CreateSkillComponent_Factory(t) {
  return new (t || CreateSkillComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialog));
};
CreateSkillComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: CreateSkillComponent,
  selectors: [["app-create-skill"]],
  outputs: {
    dataFromModal: "dataFromModal"
  },
  decls: 0,
  vars: 0,
  template: function CreateSkillComponent_Template(rf, ctx) {},
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjcmVhdGUtc2tpbGwuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceURL=webpack://./src/app/administration/skill-management/crud/create-skill/create-skill.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vc2tpbGwtbWFuYWdlbWVudC9jcnVkL2NyZWF0ZS1za2lsbC9jcmVhdGUtc2tpbGwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4995:
/*!*****************************************************************************************!*\
  !*** ./src/app/administration/skill-management/crud/skill-form/skill-form.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillFormComponent": () => (/* binding */ SkillFormComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../api */ 3889);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ 4792);











function SkillFormComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const stat_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", stat_r5.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](stat_r5.value);
  }
}
function SkillFormComponent_div_22_div_6_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const stat_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", stat_r10.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](stat_r10.value);
  }
}
function SkillFormComponent_div_22_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "select", 17)(3, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Dziedziczona");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SkillFormComponent_div_22_div_6_option_5_Template, 2, 2, "option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_div_22_div_6_Template_button_click_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);
      const i_r8 = restoredCtx.index;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r11.form.controls.subSkill.removeAt(i_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const field_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", field_r7.controls.subSkillName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", field_r7.controls.attribute);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", "inherit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 5, ctx_r6.statsEnum));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", "warn");
  }
}
function SkillFormComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "warianty umiej\u0119tno\u015Bci");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_div_22_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r13.insertSubSkillRow());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SkillFormComponent_div_22_div_6_Template, 10, 7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.form.controls.subSkill.controls);
  }
}
function SkillFormComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_div_29_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const i_r16 = restoredCtx.index;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r17.form.controls.relatedTalents.removeAt(i_r16));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const field_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", field_r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", "warn");
  }
}
function SkillFormComponent_button_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_button_33_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r19.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Aktualizuj");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SkillFormComponent_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_button_34_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r21.create());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Zapisz i dodaj nast\u0119pny");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class SkillFormComponent {
  constructor(skillsService, fb, dialogRef, data) {
    this.skillsService = skillsService;
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.statsEnum = _api__WEBPACK_IMPORTED_MODULE_1__.ExportedEnums.baseStats;
    this.form = this.fb.group({
      name: this.fb.control(''),
      advanced: this.fb.control(false),
      attribute: this.fb.control(''),
      description: this.fb.control(''),
      isCategory: this.fb.control(false),
      subSkillName: this.fb.array([]),
      relatedTalents: this.fb.array([]),
      subSkill: this.fb.array([])
    });
    if (data.item && data.mode === 'update') {
      if (data.item.subSkill.length === 0 && data.item.subSkillName.length > 0) {
        data.item.subSkill = data.item.subSkillName.map(item => ({
          subSkillName: item,
          attribute: 'inherit'
        }));
        data.item.subSkillName = [];
      }
      const talentsLength = data.item.relatedTalents.length;
      for (let i = 0; i < talentsLength; i++) {
        this.insertTalentRow();
      }
      const subSkillsNamesLength = data.item.subSkillName.length;
      for (let i = 0; i < subSkillsNamesLength; i++) {
        this.insertSubSkillRowLegacy();
      }
      const subSkillsLength = data.item.subSkill.length;
      for (let i = 0; i < subSkillsLength; i++) {
        this.insertSubSkillRow();
      }
      this.form.patchValue(data.item);
    }
  }
  insertTalentRow() {
    this.form.controls.relatedTalents.push(this.fb.control(''));
  }
  insertSubSkillRowLegacy() {
    this.form.controls.subSkillName.push(this.fb.control(''));
  }
  insertSubSkillRow() {
    this.form.controls.subSkill.push(this.fb.group({
      subSkillName: this.fb.control(''),
      attribute: this.fb.control('inherit')
    }));
  }
  onNoClick() {
    this.dialogRef.close();
  }
  update() {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.skillsService.skillControllerUpdate(_this.data.item._id.toString(), _this.form.value).toPromise();
      _this.data.emitter.emit();
      _this.dialogRef.close();
    })();
  }
  create() {
    var _this2 = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.skillsService.skillControllerCreate(_this2.form.getRawValue()).toPromise();
      _this2.data.emitter.emit();
      _this2.resetForm();
    })();
  }
  resetForm() {
    this.form.reset();
    while (this.form.controls.relatedTalents.length !== 0) {
      this.form.controls.relatedTalents.removeAt(0);
    }
    while (this.form.controls.subSkillName.length !== 0) {
      this.form.controls.subSkillName.removeAt(0);
    }
    while (this.form.controls.subSkill.length !== 0) {
      this.form.controls.subSkill.removeAt(0);
    }
  }
}
SkillFormComponent.ɵfac = function SkillFormComponent_Factory(t) {
  return new (t || SkillFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.SkillsService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.NonNullableFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MAT_DIALOG_DATA));
};
SkillFormComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: SkillFormComponent,
  selectors: [["app-skill-form"]],
  decls: 35,
  vars: 16,
  consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], [1, "wb-field", "flex-1"], [1, "wb-input", 3, "formControl"], [1, "wb-field"], [1, "", 3, "formControl", "change"], [3, "hidden", "disabled", "formControl"], [3, "value", 4, "ngFor", "ngForOf"], ["rows", "8", 1, "wb-input", 3, "formControl"], ["class", "wb-field", 4, "ngIf"], ["mat-icon-button", "", 3, "color", "click"], ["class", "wb-field-row ", 4, "ngFor", "ngForOf"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], [3, "value"], [1, "wb-field-row"], [1, "wb-input", "basis-1/3", 3, "formControl"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
  template: function SkillFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1)(3, "div", 2)(4, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Nazwa");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 4)(8, "mat-checkbox", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function SkillFormComponent_Template_mat_checkbox_change_8_listener($event) {
        return ctx.form.controls.advanced.setValue($event.checked);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Grupa umiej\u0119tno\u015Bci");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-checkbox", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Umiej\u0119tno\u015B\u0107 zaawansowana");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 2)(13, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Powi\u0105zana cecha");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "select", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, SkillFormComponent_option_16_Template, 2, 2, "option", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "keyvalue");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 2)(19, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Opis");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "textarea", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, SkillFormComponent_div_22_Template, 7, 2, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 4)(24, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Zdolno\u015Bci pokrewne");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_Template_button_click_26_listener() {
        return ctx.insertTalentRow();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "add");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](29, SkillFormComponent_div_29_Template, 5, 2, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 12)(31, "button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SkillFormComponent_Template_button_click_31_listener() {
        return ctx.onNoClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Anuluj");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, SkillFormComponent_button_33_Template, 2, 0, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, SkillFormComponent_button_34_Template, 2, 0, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.data.mode);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.form.controls.name);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.form.controls.isCategory);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.form.value.isCategory)("disabled", ctx.form.value.isCategory)("formControl", ctx.form.controls.advanced);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.form.controls.attribute);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](17, 14, ctx.statsEnum));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.form.controls.description);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.value.isCategory);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", "accent");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.form.controls.relatedTalents.controls);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.data.mode === "update");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.data.mode === "create");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckbox, _angular_common__WEBPACK_IMPORTED_MODULE_5__.KeyValuePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJza2lsbC1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceURL=webpack://./src/app/administration/skill-management/crud/skill-form/skill-form.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vc2tpbGwtbWFuYWdlbWVudC9jcnVkL3NraWxsLWZvcm0vc2tpbGwtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 7340:
/*!*********************************************************************************************!*\
  !*** ./src/app/administration/skill-management/crud/update-skill/update-skill.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateSkillComponent": () => (/* binding */ UpdateSkillComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../skill-form/skill-form.component */ 4995);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 1484);





class UpdateSkillComponent {
  constructor(dialog) {
    this.dialog = dialog;
    this.dataFromModal = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
  }
  openUpdateDialog(item) {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.dialog.open(_skill_form_skill_form_component__WEBPACK_IMPORTED_MODULE_1__.SkillFormComponent, {
        data: {
          mode: 'update',
          item,
          emitter: _this.dataFromModal
        },
        width: '70%'
      });
    })();
  }
}
UpdateSkillComponent.ɵfac = function UpdateSkillComponent_Factory(t) {
  return new (t || UpdateSkillComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialog));
};
UpdateSkillComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: UpdateSkillComponent,
  selectors: [["app-update-skill"]],
  outputs: {
    dataFromModal: "dataFromModal"
  },
  decls: 0,
  vars: 0,
  template: function UpdateSkillComponent_Template(rf, ctx) {},
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1cGRhdGUtc2tpbGwuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceURL=webpack://./src/app/administration/skill-management/crud/update-skill/update-skill.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vc2tpbGwtbWFuYWdlbWVudC9jcnVkL3VwZGF0ZS1za2lsbC91cGRhdGUtc2tpbGwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8734:
/*!*******************************************************************************!*\
  !*** ./src/app/administration/skill-management/skill-management.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillManagementComponent": () => (/* binding */ SkillManagementComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api */ 3889);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _crud_update_skill_update_skill_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crud/update-skill/update-skill.component */ 7340);
/* harmony import */ var _crud_create_skill_create_skill_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crud/create-skill/create-skill.component */ 5779);













function SkillManagementComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " name: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SkillManagementComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r15.name, " ");
  }
}
function SkillManagementComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " description: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SkillManagementComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r16.description, " ");
  }
}
function SkillManagementComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Grupa umiej\u0119tno\u015Bci: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SkillManagementComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r17.isCategory, " ");
  }
}
function SkillManagementComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Umiej\u0119tno\u015B\u0107 zaawansowana:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SkillManagementComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r18.advanced, " ");
  }
}
function SkillManagementComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SkillManagementComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 17)(1, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SkillManagementComponent_td_24_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const element_r19 = restoredCtx.$implicit;
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](_r20.openUpdateDialog(element_r19));
    })("click", function SkillManagementComponent_td_24_Template_button_click_1_listener() {
      return "";
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "app-update-skill", 2, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("dataFromModal", function SkillManagementComponent_td_24_Template_app_update_skill_dataFromModal_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r24.fetchData());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SkillManagementComponent_td_24_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const element_r19 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](28);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r25.openDialogWithTemplateRef(_r13, element_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
}
function SkillManagementComponent_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 22);
  }
}
function SkillManagementComponent_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 23);
  }
}
function SkillManagementComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h2", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Potwierd\u017A usuni\u0119cie elementu");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "mat-dialog-content")(3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Czy na pewno chcesz usun\u0105\u0107 umiej\u0119tno\u015B\u0107 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "?");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-dialog-actions", 26)(9, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Anuluj");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Tak");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const data_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](data_r27.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mat-dialog-close", data_r27._id);
  }
}
class SkillManagementComponent {
  constructor(skillsService, dialog) {
    this.skillsService = skillsService;
    this.dialog = dialog;
    this.displayedColumns = ['name', 'advanced', 'description', 'isCategory', 'actions'];
  }
  ngAfterViewInit() {
    this.fetchData();
  }
  fetchData() {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const data = yield _this.skillsService.skillControllerFindAll().toPromise();
      console.log(data);
      _this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTableDataSource(data);
      _this.dataSource.sort = _this.sort;
    })();
  }
  delete(id) {
    var _this2 = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.skillsService.skillControllerRemove(id).toPromise();
      yield _this2.fetchData();
    })();
  }
  openDialogWithTemplateRef(templateRef, data) {
    var _this3 = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this3.dialog.open(templateRef, {
        data
      }).afterClosed().toPromise();
      if (result) {
        yield _this3.delete(result);
      }
    })();
  }
}
SkillManagementComponent.ɵfac = function SkillManagementComponent_Factory(t) {
  return new (t || SkillManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.SkillsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialog));
};
SkillManagementComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: SkillManagementComponent,
  selectors: [["app-skill-management"]],
  viewQuery: function SkillManagementComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    }
  },
  decls: 29,
  vars: 3,
  consts: [[1, "m-3"], ["mat-raised-button", "", "color", "accent", 1, "ml-auto", 3, "click"], [3, "dataFromModal"], ["createSkillComponent", ""], ["mat-table", "", "matSort", "", "matSortActive", "name", "matSortDirection", "asc", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "isCategory"], ["matColumnDef", "advanced"], ["matColumnDef", "actions"], ["mat-header-cell", "", "aria-label", "row actions", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["deleteDialog", ""], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", "", "aria-label", "row actions"], ["mat-icon-button", "", "color", "accent", "aria-label", "expand row", 3, "click"], ["updateSkillComponent", ""], ["mat-icon-button", "", "color", "warn", "aria-label", "expand row", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["matDialogTitle", ""], [1, "font-bold", "text-accent-400"], ["align", "end"], ["mat-button", "", "matDialogClose", ""], ["mat-button", "", "color", "warn", 3, "mat-dialog-close"]],
  template: function SkillManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card", 0)(1, "mat-card-header")(2, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Lista umiej\u0119tno\u015Bci");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SkillManagementComponent_Template_button_click_4_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r28);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](7);
        return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](_r0.openCreateDialog());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Dodaj");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "app-create-skill", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("dataFromModal", function SkillManagementComponent_Template_app_create_skill_dataFromModal_6_listener() {
        return ctx.fetchData();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-card-content")(9, "table", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](10, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, SkillManagementComponent_th_11_Template, 2, 0, "th", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, SkillManagementComponent_td_12_Template, 2, 1, "td", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](13, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, SkillManagementComponent_th_14_Template, 2, 0, "th", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, SkillManagementComponent_td_15_Template, 2, 1, "td", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](16, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, SkillManagementComponent_th_17_Template, 2, 0, "th", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, SkillManagementComponent_td_18_Template, 2, 1, "td", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](19, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, SkillManagementComponent_th_20_Template, 2, 0, "th", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, SkillManagementComponent_td_21_Template, 2, 1, "td", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](22, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, SkillManagementComponent_th_23_Template, 2, 0, "th", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, SkillManagementComponent_td_24_Template, 9, 0, "td", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, SkillManagementComponent_tr_25_Template, 1, 0, "tr", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, SkillManagementComponent_tr_26_Template, 1, 0, "tr", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, SkillManagementComponent_ng_template_27_Template, 13, 2, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.dataSource);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    }
  },
  dependencies: [_angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRow, _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSortHeader, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatIconButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogClose, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogActions, _crud_update_skill_update_skill_component__WEBPACK_IMPORTED_MODULE_2__.UpdateSkillComponent, _crud_create_skill_create_skill_component__WEBPACK_IMPORTED_MODULE_3__.CreateSkillComponent],
  styles: [".mat-column-actions[_ngcontent-%COMP%] {\n  width: 128px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNraWxsLW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0YiLCJmaWxlIjoic2tpbGwtbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtY29sdW1uLWFjdGlvbnMge1xuICB3aWR0aDogMTI4cHg7XG59Il19 */\n/*# sourceURL=webpack://./src/app/administration/skill-management/skill-management.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vc2tpbGwtbWFuYWdlbWVudC9za2lsbC1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGO0FBQ0Esd1VBQXdVIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1jb2x1bW4tYWN0aW9ucyB7XG4gIHdpZHRoOiAxMjhweDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 6053:
/*!*******************************************************************************************!*\
  !*** ./src/app/administration/talent-management/create-talent/create-talent.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTalentComponent": () => (/* binding */ CreateTalentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/card */ 2156);


class CreateTalentComponent {}
CreateTalentComponent.ɵfac = function CreateTalentComponent_Factory(t) {
  return new (t || CreateTalentComponent)();
};
CreateTalentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CreateTalentComponent,
  selectors: [["app-create-talent"]],
  decls: 5,
  vars: 0,
  consts: [[1, "m-3"], [1, "mb-3"]],
  template: function CreateTalentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 0)(1, "mat-card-header", 1)(2, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edytowanie zdolno\u015Bci");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  dependencies: [_angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardHeader],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjcmVhdGUtdGFsZW50LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceURL=webpack://./src/app/administration/talent-management/create-talent/create-talent.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vdGFsZW50LW1hbmFnZW1lbnQvY3JlYXRlLXRhbGVudC9jcmVhdGUtdGFsZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0S0FBNEsiLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 8956:
/*!*********************************************************************************!*\
  !*** ./src/app/administration/talent-management/talent-management.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TalentManagementComponent": () => (/* binding */ TalentManagementComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api */ 3889);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 4522);











function TalentManagementComponent_th_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " name: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function TalentManagementComponent_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r10.name, " ");
  }
}
function TalentManagementComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " description: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function TalentManagementComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r11.description, " ");
  }
}
function TalentManagementComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function TalentManagementComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 13)(1, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TalentManagementComponent_td_16_Template_button_click_1_listener() {
      return "";
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TalentManagementComponent_td_16_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15);
      const element_r12 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](20);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r14.openDialogWithTemplateRef(_r8, element_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function TalentManagementComponent_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 17);
  }
}
function TalentManagementComponent_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 18);
  }
}
function TalentManagementComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Potwierd\u017A usuni\u0119cie elementu");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-dialog-content")(3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Czy na pewno chcesz usun\u0105\u0107 zdolno\u015B\u0107 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "?");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-dialog-actions", 21)(9, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Anuluj");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Tak");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const data_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](data_r17.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mat-dialog-close", data_r17._id);
  }
}
class TalentManagementComponent {
  constructor(talentService, dialog) {
    this.talentService = talentService;
    this.dialog = dialog;
    this.displayedColumns = ['name', 'description', 'actions'];
  }
  ngAfterViewInit() {
    this.fetchData();
  }
  fetchData() {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const data = yield _this.talentService.talentControllerFindAll().toPromise();
      console.log(data);
      _this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTableDataSource(data);
      _this.dataSource.sort = _this.sort;
    })();
  }
  delete(id) {
    var _this2 = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.talentService.talentControllerRemove(id).toPromise();
      yield _this2.fetchData();
    })();
  }
  openDialogWithTemplateRef(templateRef, data) {
    var _this3 = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this3.dialog.open(templateRef, {
        data
      }).afterClosed().toPromise();
      if (result) {
        yield _this3.delete(result);
      }
    })();
  }
}
TalentManagementComponent.ɵfac = function TalentManagementComponent_Factory(t) {
  return new (t || TalentManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.TalentsService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog));
};
TalentManagementComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: TalentManagementComponent,
  selectors: [["app-talent-management"]],
  viewQuery: function TalentManagementComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__.MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    }
  },
  decls: 21,
  vars: 3,
  consts: [[1, "m-3"], ["mat-raised-button", "", "color", "accent", 1, "ml-auto"], ["mat-table", "", "matSort", "", "matSortActive", "name", "matSortDirection", "desc", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "actions"], ["mat-header-cell", "", "aria-label", "row actions", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["deleteDialog", ""], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", "", "aria-label", "row actions"], ["mat-icon-button", "", "color", "accent", "aria-label", "expand row", 3, "click"], ["mat-icon-button", "", "color", "warn", "aria-label", "expand row", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["matDialogTitle", ""], [1, "font-bold", "text-accent-400"], ["align", "end"], ["mat-button", "", "matDialogClose", ""], ["mat-button", "", "color", "warn", 3, "mat-dialog-close"]],
  template: function TalentManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card", 0)(1, "mat-card-header")(2, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Lista zdolno\u015Bci");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Dodaj");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-card-content")(7, "table", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](8, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, TalentManagementComponent_th_9_Template, 2, 0, "th", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, TalentManagementComponent_td_10_Template, 2, 1, "td", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](11, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, TalentManagementComponent_th_12_Template, 2, 0, "th", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, TalentManagementComponent_td_13_Template, 2, 1, "td", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](14, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, TalentManagementComponent_th_15_Template, 2, 0, "th", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, TalentManagementComponent_td_16_Template, 7, 0, "td", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, TalentManagementComponent_tr_17_Template, 1, 0, "tr", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, TalentManagementComponent_tr_18_Template, 1, 0, "tr", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, TalentManagementComponent_ng_template_19_Template, 13, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    }
  },
  dependencies: [_angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRow, _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__.MatSortHeader, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogClose, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions],
  styles: [".mat-column-actions[_ngcontent-%COMP%] {\n  width: 128px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhbGVudC1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGIiwiZmlsZSI6InRhbGVudC1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1jb2x1bW4tYWN0aW9ucyB7XG4gIHdpZHRoOiAxMjhweDtcbn0iXX0= */\n/*# sourceURL=webpack://./src/app/administration/talent-management/talent-management.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vdGFsZW50LW1hbmFnZW1lbnQvdGFsZW50LW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0Y7QUFDQSw0VUFBNFUiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWNvbHVtbi1hY3Rpb25zIHtcbiAgd2lkdGg6IDEyOHB4O1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 7533:
/*!*******************************************************************************************!*\
  !*** ./src/app/administration/talent-management/update-talent/update-talent.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateTalentComponent": () => (/* binding */ UpdateTalentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class UpdateTalentComponent {}
UpdateTalentComponent.ɵfac = function UpdateTalentComponent_Factory(t) {
  return new (t || UpdateTalentComponent)();
};
UpdateTalentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: UpdateTalentComponent,
  selectors: [["app-update-talent"]],
  decls: 2,
  vars: 0,
  template: function UpdateTalentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "update-talent works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1cGRhdGUtdGFsZW50LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceURL=webpack://./src/app/administration/talent-management/update-talent/update-talent.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW5pc3RyYXRpb24vdGFsZW50LW1hbmFnZW1lbnQvdXBkYXRlLXRhbGVudC91cGRhdGUtdGFsZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0S0FBNEsiLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/login/login.component */ 8146);
/* harmony import */ var _dashboard_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/home/home.component */ 257);
/* harmony import */ var _auth_is_logged_in_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/is-logged-in.guard */ 1080);
/* harmony import */ var _administration_talent_management_talent_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./administration/talent-management/talent-management.component */ 8956);
/* harmony import */ var _administration_skill_management_skill_management_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./administration/skill-management/skill-management.component */ 8734);
/* harmony import */ var _administration_profession_management_profession_management_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./administration/profession-management/profession-management.component */ 7083);
/* harmony import */ var _auth_is_admin_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/is-admin.guard */ 3986);
/* harmony import */ var _administration_talent_management_create_talent_create_talent_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./administration/talent-management/create-talent/create-talent.component */ 6053);
/* harmony import */ var _administration_talent_management_update_talent_update_talent_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./administration/talent-management/update-talent/update-talent.component */ 7533);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2560);












const administrativeRoutes = [{
  path: 'talents',
  component: _administration_talent_management_talent_management_component__WEBPACK_IMPORTED_MODULE_3__.TalentManagementComponent,
  children: [{
    path: 'create',
    component: _administration_talent_management_create_talent_create_talent_component__WEBPACK_IMPORTED_MODULE_7__.CreateTalentComponent
  }, {
    path: 'update/:id',
    component: _administration_talent_management_update_talent_update_talent_component__WEBPACK_IMPORTED_MODULE_8__.UpdateTalentComponent
  }]
}, {
  path: 'skills',
  component: _administration_skill_management_skill_management_component__WEBPACK_IMPORTED_MODULE_4__.SkillManagementComponent
}, {
  path: 'professions',
  component: _administration_profession_management_profession_management_component__WEBPACK_IMPORTED_MODULE_5__.ProfessionManagementComponent
}];
const guardedRoutes = [{
  path: '',
  component: _dashboard_home_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent
}, {
  path: 'administration',
  canActivate: [_auth_is_admin_guard__WEBPACK_IMPORTED_MODULE_6__.IsAdminGuard],
  children: administrativeRoutes
}];
const routes = [{
  path: 'login',
  component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}, {
  path: '',
  canActivate: [_auth_is_logged_in_guard__WEBPACK_IMPORTED_MODULE_2__.IsLoggedInGuard],
  children: guardedRoutes
}];
class AppRoutingModule {}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
  return new (t || AppRoutingModule)();
};
AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: AppRoutingModule
});
AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule]
  });
})();

/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _auth_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/user.service */ 6679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation-bar/navigation-bar.component */ 6541);




class AppComponent {
  constructor(userService) {
    this.userService = userService;
    this.title = 'warbotter_client';
    userService.initJWT();
    console.log('test');
  }
  ngOnInit() {}
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 4,
  vars: 0,
  consts: [[1, "box", "min-h-full"], [1, "grow"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-navigation-bar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_1__.NavigationBarComponent],
  styles: [".box[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: column;\n  height: 100%;\n}\n\n.dwarf-height[_ngcontent-%COMP%] {\n  height: 3rem;\n}\n\n.logo-height[_ngcontent-%COMP%] {\n  height: 2rem;\n}\n\n.p-menubar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\n.left[_ngcontent-%COMP%], .right[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  flex-basis: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFDQTtFQUNFLFlBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtBQUVGOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7QUFFRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmR3YXJmLWhlaWdodCB7XG4gIGhlaWdodDogM3JlbTtcbn1cblxuLmxvZ28taGVpZ2h0IHtcbiAgaGVpZ2h0OiAycmVtO1xufVxuXG4ucC1tZW51YmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ubGVmdCwgLnJpZ2h0IHtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LWJhc2lzOiAwO1xufSJdfQ== */\n/*# sourceURL=webpack://./src/app/app.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGOztBQUNBO0VBQ0UsWUFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FBRUY7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtBQUVGO0FBQ0Esb3dCQUFvd0IiLCJzb3VyY2VzQ29udGVudCI6WyIuYm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmR3YXJmLWhlaWdodCB7XG4gIGhlaWdodDogM3JlbTtcbn1cblxuLmxvZ28taGVpZ2h0IHtcbiAgaGVpZ2h0OiAycmVtO1xufVxuXG4ucC1tZW51YmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ubGVmdCwgLnJpZ2h0IHtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LWJhc2lzOiAwO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api */ 3889);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth.module */ 1674);
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/dashboard.module */ 4814);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navigation-bar/navigation-bar.component */ 6541);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ 8589);
/* harmony import */ var _administration_administration_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./administration/administration.module */ 5283);
/* harmony import */ var _transloco_root_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transloco-root.module */ 7460);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
















class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  providers: [_api__WEBPACK_IMPORTED_MODULE_2__.AuthService, _api__WEBPACK_IMPORTED_MODULE_2__.CampaignsService, _api__WEBPACK_IMPORTED_MODULE_2__.DefaultService, _api__WEBPACK_IMPORTED_MODULE_2__.HeroesService, _api__WEBPACK_IMPORTED_MODULE_2__.UsersService, _api__WEBPACK_IMPORTED_MODULE_2__.MusicBotService, _api__WEBPACK_IMPORTED_MODULE_2__.TalentsService, _api__WEBPACK_IMPORTED_MODULE_2__.SkillsService, _api__WEBPACK_IMPORTED_MODULE_2__.ProfessionsService],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _auth_auth_module__WEBPACK_IMPORTED_MODULE_3__.AuthModule, _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_4__.DashboardModule, _administration_administration_module__WEBPACK_IMPORTED_MODULE_6__.AdministrationModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__.MatToolbarModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIconModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule, _transloco_root_module__WEBPACK_IMPORTED_MODULE_7__.TranslocoRootModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_5__.NavigationBarComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _auth_auth_module__WEBPACK_IMPORTED_MODULE_3__.AuthModule, _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_4__.DashboardModule, _administration_administration_module__WEBPACK_IMPORTED_MODULE_6__.AdministrationModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__.MatToolbarModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIconModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule, _transloco_root_module__WEBPACK_IMPORTED_MODULE_7__.TranslocoRootModule]
  });
})();

/***/ }),

/***/ 1674:
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthModule": () => (/* binding */ AuthModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ 8146);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 8562);
/* harmony import */ var _has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./has-privileges.pipe */ 3169);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);










class AuthModule {}
AuthModule.ɵfac = function AuthModule_Factory(t) {
  return new (t || AuthModule)();
};
AuthModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: AuthModule
});
AuthModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AuthModule, {
    declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent, _has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__.HasPrivilegesPipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule],
    exports: [_has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__.HasPrivilegesPipe]
  });
})();

/***/ }),

/***/ 3169:
/*!*********************************************!*\
  !*** ./src/app/auth/has-privileges.pipe.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HasPrivilegesPipe": () => (/* binding */ HasPrivilegesPipe),
/* harmony export */   "hasPrivileges": () => (/* binding */ hasPrivileges)
/* harmony export */ });
/* harmony import */ var src_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/api */ 3889);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);


class HasPrivilegesPipe {
  transform(value, requiredRole) {
    return hasPrivileges(value, requiredRole);
  }
}
HasPrivilegesPipe.ɵfac = function HasPrivilegesPipe_Factory(t) {
  return new (t || HasPrivilegesPipe)();
};
HasPrivilegesPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
  name: "hasPrivileges",
  type: HasPrivilegesPipe,
  pure: true
});
function hasPrivileges(userRole, requiredRole) {
  console.log(userRole);
  console.log(requiredRole);
  const userRoleIndex = Object.values(src_api__WEBPACK_IMPORTED_MODULE_0__.User.role).indexOf(userRole);
  const requireRoleIndex = Object.values(src_api__WEBPACK_IMPORTED_MODULE_0__.User.role).indexOf(requiredRole);
  return userRoleIndex >= requireRoleIndex;
}

/***/ }),

/***/ 3986:
/*!****************************************!*\
  !*** ./src/app/auth/is-admin.guard.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IsAdminGuard": () => (/* binding */ IsAdminGuard)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api */ 3889);
/* harmony import */ var _has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./has-privileges.pipe */ 3169);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ 6679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);





class IsAdminGuard {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
  }
  canActivate(route, state) {
    return (0,_has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__.hasPrivileges)(this.userService.user?.role, _api__WEBPACK_IMPORTED_MODULE_0__.User.role.ADMIN);
  }
}
IsAdminGuard.ɵfac = function IsAdminGuard_Factory(t) {
  return new (t || IsAdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
IsAdminGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: IsAdminGuard,
  factory: IsAdminGuard.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 1080:
/*!********************************************!*\
  !*** ./src/app/auth/is-logged-in.guard.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IsLoggedInGuard": () => (/* binding */ IsLoggedInGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.service */ 6679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);



class IsLoggedInGuard {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
  }
  canActivate(route, state) {
    console.log('test guard');
    console.log(!!this.userService.user);
    if (!this.userService.user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
IsLoggedInGuard.ɵfac = function IsLoggedInGuard_Factory(t) {
  return new (t || IsLoggedInGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};
IsLoggedInGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: IsLoggedInGuard,
  factory: IsLoggedInGuard.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8146:
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user.service */ 6679);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 4522);






class LoginComponent {
  constructor(userSevice) {
    this.userSevice = userSevice;
    // test: ModelFormGroup<loginDto> = {email:new FormControl('a', {nonNullable: true}), password: new FormControl('b',{nonNullable: true})}
    this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl('', {
        nonNullable: true
      }),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl('', {
        nonNullable: true
      })
    });
    this.userSevice.logout();
  }
  ngOnInit() {
    this.userSevice.logout();
  }
  login() {
    const loginForm = this.loginForm.getRawValue();
    this.userSevice.login(loginForm);
  }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) {
  return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService));
};
LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: LoginComponent,
  selectors: [["app-login"]],
  decls: 24,
  vars: 3,
  consts: [[1, "flex", "flex-col", "h-5/6", "items-center", "justify-evenly"], [1, "flex", "flex-col", "justify-center"], ["src", "/assets/dwarf.png", 1, "dwarf-logo"], ["src", "/assets/logo.svg", 1, "warbotter-logo"], [1, "w-2/6"], [3, "formGroup", "ngSubmit"], [1, "flex", "flex-col"], [1, "wb-field"], ["type", "login", 1, "wb-input", 3, "formControlName"], ["type", "password", 1, "wb-input", 3, "formControlName"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["type", "submit", 2, "display", "none"]],
  template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 2)(3, "img", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-card", 4)(5, "form", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_5_listener() {
        return ctx.login();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-card-header")(7, "mat-card-title")(8, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-card-content")(11, "div", 6)(12, "div", 7)(13, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "E-mail:");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 7)(17, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Password:");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "input", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "mat-card-actions")(21, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_21_listener() {
        return ctx.login();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.loginForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControlName", "email");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControlName", "password");
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardActions, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceURL=webpack://./src/app/auth/login/login.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0tBQWdLIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 6679:
/*!**************************************!*\
  !*** ./src/app/auth/user.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 3889);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jwt-decode */ 9168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);







const TOKEN_STORAGE_KEY = 'AuthorizationToken';
class UserService {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  initJWT() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      const decodedToken = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_2__["default"])(token);
      if (decodedToken) {
        this.user = decodedToken.sub;
        _api__WEBPACK_IMPORTED_MODULE_1__.OpenAPI.TOKEN = token;
        this.token = token;
      }
    }
  }
  login(credentials) {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const token$ = _this.authService.authControllerLogin(credentials);
      const token = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(token$);
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token.access_token);
        _this.initJWT();
        _this.router.navigate(['/']);
      }
    })();
  }
  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.user = undefined;
    _api__WEBPACK_IMPORTED_MODULE_1__.OpenAPI.TOKEN = '';
  }
}
UserService.ɵfac = function UserService_Factory(t) {
  return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_api__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
};
UserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: UserService,
  factory: UserService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 4814:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardModule": () => (/* binding */ DashboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 257);
/* harmony import */ var _music_bot_music_bot_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../music-bot/music-bot.module */ 5875);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);




class DashboardModule {}
DashboardModule.ɵfac = function DashboardModule_Factory(t) {
  return new (t || DashboardModule)();
};
DashboardModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: DashboardModule
});
DashboardModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _music_bot_music_bot_module__WEBPACK_IMPORTED_MODULE_1__.MusicBotModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DashboardModule, {
    declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _music_bot_music_bot_module__WEBPACK_IMPORTED_MODULE_1__.MusicBotModule]
  });
})();

/***/ }),

/***/ 257:
/*!**************************************************!*\
  !*** ./src/app/dashboard/home/home.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api */ 3889);
/* harmony import */ var _music_bot_music_bot_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../music-bot/music-bot.component */ 6582);





class HomeComponent {
  constructor(heroService) {
    this.heroService = heroService;
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const heroesPromise = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(_this.heroService.heroControllerFindAll());
      _this.champions = yield heroesPromise;
    })();
  }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.HeroesService));
};
HomeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: HomeComponent,
  selectors: [["app-home"]],
  decls: 3,
  vars: 0,
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "home works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "app-music-bot");
    }
  },
  dependencies: [_music_bot_music_bot_component__WEBPACK_IMPORTED_MODULE_2__.MusicBotComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceURL=webpack://./src/app/dashboard/home/home.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0tBQWdLIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 8677:
/*!********************************************************!*\
  !*** ./src/app/music-bot/music-bot-gateway.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MusicBotGateway": () => (/* binding */ MusicBotGateway)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ 4769);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _auth_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/user.service */ 6679);




class MusicBotGateway {
  constructor(userService) {
    this.userService = userService;
    this.messages$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    let socket;
    if (this.userService.token) {
      socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)({
        extraHeaders: {
          auth: userService.token
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000
      });
      socket.on('music', message => {
        this.messages$.next(message);
      });
      socket.on('connect', () => {
        console.log('ws connection established');
      });
      //
      // socket.on('disconnect', () => {
      //   socket.connect()
      // })
      //
    }
  }
}

MusicBotGateway.ɵfac = function MusicBotGateway_Factory(t) {
  return new (t || MusicBotGateway)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_auth_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService));
};
MusicBotGateway.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: MusicBotGateway,
  factory: MusicBotGateway.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 6582:
/*!**************************************************!*\
  !*** ./src/app/music-bot/music-bot.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MusicBotComponent": () => (/* binding */ MusicBotComponent)
/* harmony export */ });
/* harmony import */ var _home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _music_bot_gateway_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music-bot-gateway.service */ 8677);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api */ 3889);





const _c0 = ["player"];
class MusicBotComponent {
  constructor(musicBot, musicBotService) {
    this.musicBot = musicBot;
    this.musicBotService = musicBotService;
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this.currentVideoId = '';
    this.audio = new Audio('https://cdn.freesound.org/previews/609/609335_2770604-lq.mp3');
    this.loop = false;
    this.videos = [{
      name: 'Fantasy Bard/Tavern Music Compilation',
      id: 'wLlovxa3VJ0'
    }, {
      name: 'A_NquTCxqyY',
      id: 'celtic tavern'
    }, {
      name: 'battle in rain',
      id: 'aSlkAK9GplE'
    }, {
      name: 'Winter Legion',
      id: 'qtLDIKGjQc4'
    }, {
      name: 'Medieval Celtic Music',
      id: 'ipFaubyDUT4'
    }, {
      name: 'Fantasy Bard',
      id: 'wLlovxa3VJ0'
    }];
  }
  broadcast(id) {
    var _this = this;
    return (0,_home_jakub_WH_APP_warbotter_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.musicBotService.musicBotControllerPing(id, true).toPromise();
    })();
  }
  ngOnInit() {
    this.audio.play().then(() => {
      // already allowed
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.muted = false;
      this.musicBot.soundPermissionGranted = true;
    }).catch(() => {
      // need user interaction
      this.musicBot.soundPermissionGranted = false;
      this.confirm();
    });
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
  confirm() {
    // this.confirmationService.confirm({
    //   message: 'Warbotter potrzebuje uprawnień do odtwarzania dźwięku',
    //   accept: () => {
    //     this.audio.play()
    //     this.musicBot.soundPermissionGranted = true;
    //     if (this.player) {
    //       this.player.unMute();
    //     }
    //   }
    // });
  }
  setVideoId(id) {
    this.currentVideoId = id;
    // console.log('setting id');
    // this.videoId = id;
    // this.player.videoId = id;
  }

  cueVideo() {
    this.musicBot.soundPermissionGranted ? this.player.unMute() : this.player.mute();
    console.log(this.startSeconds);
    console.log(this.endSeconds);
    console.log(this.startSeconds || 0);
    const options = {
      videoId: this.currentVideoId,
      startSeconds: 0,
      suggestedQuality: "hd720"
    };
    if (this.startSeconds >= 0) {
      options.startSeconds = this.startSeconds;
    }
    if (this.endSeconds >= 0) {
      options.endSeconds = this.endSeconds;
    }
    console.log(options);
    this.playerInstance.cueVideoById(options);
    console.log(this.playerInstance.getCurrentTime());
    setTimeout(() => {
      this.playerInstance.seekTo(options.startSeconds, true);
    }, 300);
    // this.playerInstance.seekTo(options.startSeconds!, true)
    // console.log('seek to 0')
    // this.player.seekTo(0, true)
    // this.player.playVideo()
  }
  // Autoplay
  onReady(event) {
    this.playerInstance = event.target;
    console.log('onReady');
    this.musicBot.messages$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.destroy$)).subscribe(msg => {
      console.log('playing', msg);
      this.loop = msg.loop;
      this.setVideoId(msg.videoId);
      this.startSeconds = msg.startSeconds;
      this.endSeconds = msg.endSeconds;
      if (this.playerInstance) {
        console.log('playing');
        this.cueVideo();
      }
    });
    // this.playVideo()
  }
  // Loop
  onStateChange(event) {
    this.playerInstance = event.target;
    // console.log(this.playerInstance)
    console.log('state change:', event);
    // if (!this.loop) {
    //   return
    // }
    if (event.data === YT.PlayerState.ENDED && this.loop) {
      console.log('ended, restarting');
      // this.playerInstance.pauseVideo();
      this.startSeconds ? this.playerInstance.seekTo(this.startSeconds, true) : this.playerInstance.seekTo(0, true);
      this.playerInstance.playVideo();
    }
    if (event.data === YT.PlayerState.UNSTARTED) {
      console.log('unstarted, trying to start');
      this.playerInstance.playVideo();
    }
    if (event.data === YT.PlayerState.CUED) {
      this.playerInstance.playVideo();
    }
  }
  ngAfterViewInit() {}
  ngOnDestroy() {}
}
MusicBotComponent.ɵfac = function MusicBotComponent_Factory(t) {
  return new (t || MusicBotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_music_bot_gateway_service__WEBPACK_IMPORTED_MODULE_1__.MusicBotGateway), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_2__.MusicBotService));
};
MusicBotComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: MusicBotComponent,
  selectors: [["app-music-bot"]],
  viewQuery: function MusicBotComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.player = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([])],
  decls: 2,
  vars: 0,
  template: function MusicBotComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "music-bot works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtdXNpYy1ib3QuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceURL=webpack://./src/app/music-bot/music-bot.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbXVzaWMtYm90L211c2ljLWJvdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 5875:
/*!***********************************************!*\
  !*** ./src/app/music-bot/music-bot.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MusicBotModule": () => (/* binding */ MusicBotModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _music_bot_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music-bot.component */ 6582);
/* harmony import */ var _angular_youtube_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/youtube-player */ 2163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);




class MusicBotModule {}
MusicBotModule.ɵfac = function MusicBotModule_Factory(t) {
  return new (t || MusicBotModule)();
};
MusicBotModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: MusicBotModule
});
MusicBotModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_youtube_player__WEBPACK_IMPORTED_MODULE_3__.YouTubePlayerModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MusicBotModule, {
    declarations: [_music_bot_component__WEBPACK_IMPORTED_MODULE_0__.MusicBotComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_youtube_player__WEBPACK_IMPORTED_MODULE_3__.YouTubePlayerModule],
    exports: [_music_bot_component__WEBPACK_IMPORTED_MODULE_0__.MusicBotComponent]
  });
})();

/***/ }),

/***/ 6541:
/*!************************************************************!*\
  !*** ./src/app/navigation-bar/navigation-bar.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationBarComponent": () => (/* binding */ NavigationBarComponent)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 9306);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _auth_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/user.service */ 6679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ 8589);
/* harmony import */ var _auth_has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/has-privileges.pipe */ 3169);










function NavigationBarComponent_div_0_button_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Campaigns");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function NavigationBarComponent_div_0_button_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Administration ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r3);
  }
}
function NavigationBarComponent_div_0_button_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", "/login");
  }
}
const _c0 = function () {
  return ["administration", "talents"];
};
const _c1 = function () {
  return ["administration", "skills"];
};
const _c2 = function () {
  return ["administration", "professions"];
};
function NavigationBarComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "mat-toolbar")(2, "div", 2)(3, "div", 3)(4, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Characters");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NavigationBarComponent_div_0_button_6_Template, 2, 0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "hasPrivileges");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, NavigationBarComponent_div_0_button_8_Template, 3, 1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "hasPrivileges");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-menu", null, 7)(12, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Zdolno\u015Bci");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Umiej\u0119tno\u015Bci");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Profesje");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "img", 13)(26, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, NavigationBarComponent_div_0_button_28_Template, 3, 1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](7, 6, ctx_r0.userService.user.role, "GM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](9, 9, ctx_r0.userService.user.role, "Admin"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](12, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](13, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](14, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.userService.user);
  }
}
class NavigationBarComponent {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
    this.items = [{
      label: 'Zdolności',
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faStar,
      command: () => {
        // this.update();
      }
    }, {
      label: 'Umiejętności',
      icon: 'pi pi-refresh',
      command: () => {
        // this.update();
      }
    }, {
      label: 'Profesje',
      icon: 'pi pi-star',
      command: () => {
        // this.update();
      }
    }];
  }
}
NavigationBarComponent.ɵfac = function NavigationBarComponent_Factory(t) {
  return new (t || NavigationBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
NavigationBarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: NavigationBarComponent,
  selectors: [["app-navigation-bar"]],
  decls: 1,
  vars: 1,
  consts: [["class", "", 4, "ngIf"], [1, ""], [1, "flex", "justify-content-between", "w-full"], [1, "flex-1", "flex", "flex-row", "items-center"], ["color", "accent", "mat-button", "", "type", "button", 1, "p-button-text"], ["color", "accent", "mat-button", "", "type", "button", "class", "p-button-text", 4, "ngIf"], ["color", "accent", "mat-button", "", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor", 4, "ngIf"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "routerLink"], ["fontSet", "fas", "fontIcon", "fa-star"], ["fontSet", "fas", "fontIcon", "fa-book"], ["fontSet", "fas", "fontIcon", "fa-street-view"], [1, "flex", "items-center"], ["src", "/assets/dwarf.png", 1, "dwarf-logo", "dwarf-height"], ["src", "/assets/logo.svg", 1, "warbotter-logo", "logo-height"], [1, "flex-1", "flex", "flex-row-reverse", "items-center"], ["mat-raised-button", "", "color", "warn", "class", "p-button-danger p-menubar-end", "label", "Logout", 3, "routerLink", 4, "ngIf"], ["color", "accent", "mat-button", "", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], ["fontSet", "fas", "fontIcon", "fa-cog"], ["mat-raised-button", "", "color", "warn", "label", "Logout", 1, "p-button-danger", "p-menubar-end", 3, "routerLink"], ["fontSet", "fas", "fontIcon", "fa-power-off"]],
  template: function NavigationBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, NavigationBarComponent_div_0_Template, 29, 15, "div", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userService.user);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuTrigger, _auth_has_privileges_pipe__WEBPACK_IMPORTED_MODULE_1__.HasPrivilegesPipe],
  styles: [".p-menubar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\n.dwarf-height[_ngcontent-%COMP%] {\n  height: 3rem;\n}\n\n.logo-height[_ngcontent-%COMP%] {\n  height: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24tYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FBQ0Y7O0FBR0E7RUFDRSxZQUFBO0FBQUY7O0FBRUE7RUFDRSxZQUFBO0FBQ0YiLCJmaWxlIjoibmF2aWdhdGlvbi1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucC1tZW51YmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZHdhcmYtaGVpZ2h0IHtcbiAgaGVpZ2h0OiAzcmVtO1xufVxuXG4ubG9nby1oZWlnaHQge1xuICBoZWlnaHQ6IDJyZW07XG59Il19 */\n/*# sourceURL=webpack://./src/app/navigation-bar/navigation-bar.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbmF2aWdhdGlvbi1iYXIvbmF2aWdhdGlvbi1iYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjtBQUNBLG9oQkFBb2hCIiwic291cmNlc0NvbnRlbnQiOlsiLnAtbWVudWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmR3YXJmLWhlaWdodCB7XG4gIGhlaWdodDogM3JlbTtcbn1cblxuLmxvZ28taGVpZ2h0IHtcbiAgaGVpZ2h0OiAycmVtO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 655:
/*!*******************************************************************!*\
  !*** ./src/app/translations/imported-definitions-translations.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseStatsTranslations": () => (/* binding */ BaseStatsTranslations)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api */ 3889);
var _a, _b, _c, _d, _e, _f, _g, _h;

class BaseStatsTranslations {
  constructor() {
    this[_a] = $localize`{full, select, true {Walka wręcz} other {WW}}`;
    this[_b] = $localize`{full, select, true {Umiejętności strzeleckie} other {US}}`;
    this[_c] = $localize`{full, select, true {Krzepa} other {K}}`;
    this[_d] = $localize`{full, select, true {Odporność} other {ODP}}`;
    this[_e] = $localize`{full, select, true {Zręczność} other {ZR}}`;
    this[_f] = $localize`{full, select, true {Inteligencja} other {INT}}`;
    this[_g] = $localize`{full, select, true {Siła woli} other {SW}}`;
    this[_h] = $localize`{full, select, true {Ogłada} other {OGD}}`;
  }
}
_a = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.WW, _b = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.US, _c = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.K, _d = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.ODP, _e = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.ZR, _f = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.INT, _g = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.SW, _h = _api__WEBPACK_IMPORTED_MODULE_0__.ExportedEnums.baseStats.OGD;

/***/ }),

/***/ 7460:
/*!******************************************!*\
  !*** ./src/app/transloco-root.module.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslocoHttpLoader": () => (/* binding */ TranslocoHttpLoader),
/* harmony export */   "TranslocoRootModule": () => (/* binding */ TranslocoRootModule)
/* harmony export */ });
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngneat/transloco */ 3091);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 8987);




class TranslocoHttpLoader {
  constructor(http) {
    this.http = http;
  }
  getTranslation(lang) {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}
TranslocoHttpLoader.ɵfac = function TranslocoHttpLoader_Factory(t) {
  return new (t || TranslocoHttpLoader)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
};
TranslocoHttpLoader.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: TranslocoHttpLoader,
  factory: TranslocoHttpLoader.ɵfac,
  providedIn: 'root'
});
class TranslocoRootModule {}
TranslocoRootModule.ɵfac = function TranslocoRootModule_Factory(t) {
  return new (t || TranslocoRootModule)();
};
TranslocoRootModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: TranslocoRootModule
});
TranslocoRootModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [{
    provide: _ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__.TRANSLOCO_CONFIG,
    useValue: (0,_ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__.translocoConfig)({
      availableLangs: ['pl', 'en'],
      defaultLang: 'pl',
      // Remove this option if your application doesn't support changing language in runtime.
      reRenderOnLangChange: true,
      prodMode: !(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.isDevMode)()
    })
  }, {
    provide: _ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__.TRANSLOCO_LOADER,
    useClass: TranslocoHttpLoader
  }],
  imports: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__.TranslocoModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](TranslocoRootModule, {
    exports: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_2__.TranslocoModule]
  });
})();

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);
/* harmony import */ var _app_translations_imported_definitions_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/translations/imported-definitions-translations */ 655);





let aseStatsTranslations = _app_translations_imported_definitions_translations__WEBPACK_IMPORTED_MODULE_2__.BaseStatsTranslations;
if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(6344), __webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map