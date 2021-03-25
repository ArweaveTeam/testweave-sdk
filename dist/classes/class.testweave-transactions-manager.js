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
var class_testweave_utils_1 = __importDefault(require("./class.testweave-utils"));
var TestWeaveTransactionsManager = /** @class */ (function () {
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param arweaveInstance an arweave instance.
     */
    function TestWeaveTransactionsManager(arweaveInstance) {
        this._arweave = arweaveInstance;
    }
    /**
     * Private constructor that creates the TransactionManager Instance
     * @param arweaveInstance the Arweave instance
     */
    TestWeaveTransactionsManager.init = function (arweaveInstance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const readyForMiningTxs: Array<string> = (await arweaveInstance.api.get('tx/ready_for_mining')).data;
                return [2 /*return*/, new TestWeaveTransactionsManager(arweaveInstance)];
            });
        });
    };
    /**
     * Resolve the transactions pool
     * @param minedTransactions
     */
    TestWeaveTransactionsManager.prototype.resolvePool = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readyForMiningTxs, _i, _a, txID, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this._arweave.api.get('tx/ready_for_mining')];
                    case 1:
                        readyForMiningTxs = (_b.sent()).data;
                        if (!readyForMiningTxs.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._arweave.api.post('mine', '')];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i = 0;
                        return [4 /*yield*/, this._arweave.api.get('tx/ready_for_mining')];
                    case 4:
                        _a = (_b.sent()).data;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        txID = _a[_i];
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this._arweave.transactions.getStatus(txID)];
                    case 7:
                        if (!((_b.sent()).status !== 200)) return [3 /*break*/, 9];
                        return [4 /*yield*/, class_testweave_utils_1.default.init(this._arweave).delay(505)];
                    case 8:
                        _b.sent();
                        false;
                        return [3 /*break*/, 6];
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10: return [2 /*return*/, readyForMiningTxs];
                    case 11:
                        error_1 = _b.sent();
                        return [2 /*return*/, error_1.response];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This is a get method that is intended to replace the arwwave.api get one.
     * It does the same things of the arweave.api one, but it pull the internal rewrites the baseUrl if needed
     * @param endpoint the endpoint that must be called
     * @param config the optional configurations that must be sent along the post request
     */
    TestWeaveTransactionsManager.prototype.getGet = function (endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request = this._arweave.api.request();
                        // console.log(request);
                        request.defaults.baseURL = 'http://localhost';
                        return [4 /*yield*/, request.get(endpoint, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2.response];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This is a post method that is intended to replace the arwwave.api post one.
     * It does the same things of the arweave.api one, but it pull the internal transactions pool too.
     * @param endpoint the endpoint that must be called
     * @param body the Body of the post request
     * @param config the optional configurations that must be sent along the post request
     */
    TestWeaveTransactionsManager.prototype.getPost = function (endpoint, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    body, config) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        request = this._arweave.api.request();
                        if (endpoint === 'graphql') {
                            request.defaults.baseURL = 'http://localhost';
                        }
                        return [4 /*yield*/, request.post(endpoint, body, config)];
                    case 1:
                        response = _a.sent();
                        if (!(endpoint === 'tx')) return [3 /*break*/, 4];
                        id = body.id;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._arweave.api.get('tx/ready_for_mining')];
                    case 3:
                        if (!!(_a.sent()).data.includes(id)) return [3 /*break*/, 4];
                        false;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, response];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3.response];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return TestWeaveTransactionsManager;
}());
exports.default = TestWeaveTransactionsManager;
//# sourceMappingURL=class.testweave-transactions-manager.js.map