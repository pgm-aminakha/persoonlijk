import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
    bold: function (text) {
        return `<strong>${text}</strong>`;
    },
    "when": function (operand1, operator, operand2, options) {
        let operators = {
            'eq': function (l, r) { return l == r; },
            'noteq': function (l, r) { return l != r; },
            'gt': function (l, r) { return Number(l) > Number(r); },
            'gte': function (l, r) { return Number(l) >= Number(r); },
            'lt': function (l, r) { return Number(l) < Number(r); },
            'lte': function (l, r) { return Number(l) <= Number(r); },
            'and': function (l, r) { return l && r; },
            'or': function (l, r) { return l || r; }
        };
        let result = operators[operator](operand1, operand2);
        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
};

export default { ...handyHelpers, ...myHelpers };