tf.tidy(function() {
    let values = [1,2,3,4,5,6];

    // Creating tensors
    a = tf.tensor(values, [3,2], "int32");
    b = tf.tensor(values, [3,2], "int32");

    // Creating variable tensors
    let v = tf.variable(a);
    console.log(v);

    // Tensor operations
    let c = tf.add(a, b);
    let d = tf.sub(a, b);
    let e = tf.mul(a, b);
    let f = tf.matMul(a, tf.transpose(b));

    c.print();
    d.print();
    e.print();
    f.print();

})

// Reading data asynchronously
f.data().then(data => console.log(data));

f.data().then(function(data) {
    console.log(data);
});

// Reading data synchronously
let tdata = f.dataSync();
console.log(tdata[0]);
