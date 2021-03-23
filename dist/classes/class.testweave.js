"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_testweave_request_1 = __importDefault(require("./class.testweave-request"));
var class_testweave_transactions_manager_1 = __importDefault(require("./class.testweave-transactions-manager"));
var class_testweave_utils_1 = __importDefault(require("./class.testweave-utils"));
var TestWeave = /** @class */ (function () {
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param arweaveInstance an arweave instance.
     */
    function TestWeave(arweaveInstance, transactionManager) {
        var _this = this;
        // init the transaction TransactionManager
        this._transactionManager = transactionManager;
        // get the api config
        var apiConfig = arweaveInstance.api.config;
        var testWeaveRequest = class_testweave_request_1.default.init(apiConfig);
        // overwrite the arweave.api.request method, so that it can include the requested headers
        arweaveInstance.api.request = function () { return testWeaveRequest.getRequest(); };
        // overwrite the arweave.api.post method, so that it can send requests by means of the transaction manager
        arweaveInstance.api.post = function (endpoint, 
        // eslint-disable-next-line @typescript-eslint/ban-types
        body, config) { return _this._transactionManager.getPost(endpoint, body, config); };
        // overwrite the arweave.api.get method, so that it can send requests by means of the transaction manager
        arweaveInstance.api.get = function (endpoint, config) { return _this._transactionManager.getGet(endpoint, config); };
        // init the arweave instance
        this._arweave = arweaveInstance;
        // init the utils
        this._utils = class_testweave_utils_1.default.init(this._arweave);
        // sets the root JWL
        this._rootJWK = this._utils.getRootJWK();
    }
    /**
     * Returns a TestWeave instance
     * @param arweaveInstance the arweave instance on the top of with the TestWeave must be created. The instance should be created with arweave.init().
     * @returns TestWeave a TestWeave instance.
    */
    TestWeave.init = function (arweaveInstance) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionManager, testWeaveInstance, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_testweave_transactions_manager_1.default.init(arweaveInstance)];
                    case 1:
                        transactionManager = _a.sent();
                        testWeaveInstance = new TestWeave(arweaveInstance, transactionManager);
                        // return the testweave instance
                        return [2 /*return*/, testWeaveInstance];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error('TestWeave Error: Cannot init the TestWeave instance');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(TestWeave.prototype, "rootJWK", {
        /**
         * Returns the root JWK, its address should be MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y and its initial balance is 100000000000000000
         * @returns JWKInterface a JSON containing the test weave root wallet
         */
        get: function () {
            return this._rootJWK;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Drops the given winston from the root JWK to the given address.
     * @param targetAddress the address to which drop the winston
     * @param winstonBalance the amount of winston that must be dropped
     */
    TestWeave.prototype.drop = function (targetAddress, winstonBalance) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._utils.dropFromRootAddress(targetAddress, winstonBalance, this._transactionManager)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Mines a new block in the TestWeave Network
     * @returns the axios response created around the call to the /mine endpoint
    */
    TestWeave.prototype.mine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._utils.mine(this._transactionManager)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return TestWeave;
}());
exports.default = TestWeave;
//# sourceMappingURL=class.testweave.js.map