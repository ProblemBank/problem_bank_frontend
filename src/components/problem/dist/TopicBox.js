"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var problem_1 = require("../../redux/slices/problem");
var Topic_1 = require("./Topic");
var TopicBox = function (_a) {
    var getTopics = _a.getTopics, getSubtopics = _a.getSubtopics, topics = _a.topics, subtopics = _a.subtopics, setProperties = _a.setProperties, properties = _a.properties;
    react_1.useEffect(function () {
        getTopics({});
        getSubtopics({});
    }, []);
    // todo: make cleaner
    var handleClick = function (id, listName) {
        var _a;
        var temporaryList = __spreadArrays(properties[listName]);
        var temporarySubtopicsList = __spreadArrays(properties['subtopics']);
        var index = temporaryList.indexOf(id);
        if (index > -1) {
            temporaryList.splice(index, 1);
            if (listName === 'topics') {
                for (var _i = 0, subtopics_1 = subtopics; _i < subtopics_1.length; _i++) {
                    var subtopic = subtopics_1[_i];
                    if (subtopic.topic === id) {
                        for (var i = 0; i < temporarySubtopicsList.length; i++) {
                            if (temporarySubtopicsList[i] === subtopic.id) {
                                temporarySubtopicsList.splice(i, 1);
                            }
                        }
                    }
                }
            }
        }
        else {
            temporaryList.push(id);
        }
        setProperties(__assign(__assign({}, properties), (_a = { 'subtopics': temporarySubtopicsList }, _a[listName] = temporaryList, _a)));
    };
    return (react_1["default"].createElement(material_1.Stack, { justifyContent: 'center', alignItems: 'stretch', spacing: 2 },
        react_1["default"].createElement(material_1.Stack, { spacing: 1 },
            react_1["default"].createElement(material_1.Typography, { gutterBottom: true, variant: 'h3' }, 'موضوعات'),
            react_1["default"].createElement(material_1.Paper, { sx: { padding: 2 } }, topics.map(function (topic) {
                var _a;
                return (react_1["default"].createElement(Topic_1["default"], { key: topic.id, name: topic.title, selected: (_a = properties === null || properties === void 0 ? void 0 : properties.topics) === null || _a === void 0 ? void 0 : _a.includes(topic.id), clickable: true, onClick: function () { return handleClick(topic.id, 'topics'); } }));
            }))),
        react_1["default"].createElement(material_1.Stack, { spacing: 1 },
            react_1["default"].createElement(material_1.Typography, { gutterBottom: true, variant: 'h3' }, 'زیرموضوعات'),
            react_1["default"].createElement(material_1.Paper, { sx: { padding: 2 } },
                subtopics.filter(function (subtopic) { var _a; return (_a = properties === null || properties === void 0 ? void 0 : properties.topics) === null || _a === void 0 ? void 0 : _a.includes(subtopic.topic); }).length == 0 &&
                    react_1["default"].createElement(material_1.Typography, null, "\u0645\u0648\u0636\u0648\u0639 \u062C\u0632\u0626\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F!"), subtopics === null || subtopics === void 0 ? void 0 :
                subtopics.filter(function (subtopic) { var _a; return (_a = properties === null || properties === void 0 ? void 0 : properties.topics) === null || _a === void 0 ? void 0 : _a.includes(subtopic.topic); }).map(function (subtopic) { return (react_1["default"].createElement(Topic_1["default"], { key: subtopic.id, name: subtopic.title, selected: properties.subtopics.includes(subtopic.id), clickable: true, onClick: function () { return handleClick(subtopic.id, 'subtopics'); } })); })))));
};
var mapStateToProps = function (state) { return ({
    topics: state.problem.topics,
    subtopics: state.problem.subtopics
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, {
    getTopics: problem_1.getTopicsAction,
    getSubtopics: problem_1.getSubtopicsAction
})(TopicBox);
