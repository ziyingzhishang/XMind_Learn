 var answerSpan = document.getElementById('answer');
var MQ = MathQuill.getInterface(2);
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
        }
    }
});