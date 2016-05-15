Node = function(key, value){
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 0;
    this.x = 0;
    this.y = 0;
    this.level = 1;    
};

BinaryTree = function(){};
BinaryTree.prototype.root = null;
BinaryTree.prototype.addNode = function(key, value){
    this.root = putNode( this.root, key, value );
};
function putNode(node, key, value){
    if ( !node ) return new Node(key, value);
    if (node.key > key )
        node.left = putNode( node.left, key, value);
     else if (node.key < key) 
        node.right = putNode(node.right, key, value);
     else if (node.key == key)
        node.value = value;  

    node.count = 1 + getSize(node.left) + getSize(node.right);
    return node;
}

function getSize(node){
    if (!node) return 0;

    return node.count;
}

BinaryTree.prototype.getNode = function(key){

    var currentNode = this.root;

    while (currentNode != null){
        if (currentNode.key > key) currentNode = currentNode.left;
        else if (currentNode.key < key) currentNode = currentNode.right;
        else if (currentNode.key == key ) return currentNode;
    }

    return null;
};

BinaryTree.prototype.getMinNode = function(){
    return getMin(this.root);
};
function getMin(node){

    if (!node.left) return node;

    return getMin(node.left);
}

BinaryTree.prototype.getMaxNode = function(){
    return getMax(this.root);
};
function getMax(node){

    if (!node.right) return node;

    return getMax(node.right);
}

BinaryTree.prototype.deleteMin = function(){
    deleteMin(this.root);
};
function deleteMin(node){
    if (node.left == null) return node.right;

    node.left = deleteMin(node.left);
    node.count = 1 + getSize(node.left) + getSize(node.right);

    return node;
}

BinaryTree.prototype.floor = function(key){
    var n = getFloor(this.root, key);
    return n;
};
function getFloor(node, key){
    if ( node == null ) return null;
    if (node.key == key ) return node;
    if (node.key > key) return getFloor(node.left, key);
    var x = getFloor(node.right, key);
    if (x) return x;
    return node;
}

BinaryTree.prototype.ceil = function(key){
    var n = getCeil(this.root, key);
    return n;
};
function getCeil(node, key){
    if ( node == null ) return null;
    if (node.key == key ) return node;
    if (node.key < key) return getCeil(node.right, key);
    var x = getCeil(node.left, key);
    if (x) return x;
    return node;
}

BinaryTree.prototype.deleteNode = function(key){
    this.root = deleteNode(this.root, key);
};
function deleteNode(node, key){
    if (!node) return null;
    if (node.key > key) node.left = deleteNode(node.left, key);
    else if (node.key < key) node.right = deleteNode(node.right, key);
    else {
        if (!node.right) return node.left;
        if (!node.left) return node.right;
        var t = node;
        node = getMin(t.right);
        node.right = deleteMin(t.right);
        node.left = t.left;
    }
    node.count = 1 + getSize(node.left) + getSize(node.right);
    return node;
}

BinaryTree.prototype.preOrder = function() {
    preOrder(this.root);
};
function preOrder(node){
    if (node == null) return;
    nodes.push(node);
    preOrder(node.left);
    preOrder(node.right);
}
BinaryTree.prototype.inOrder = function() {
	inOrder(this.root);
}
function inOrder(node){
	if (node == null) return;
	nodes.push(node);
	inOrder(node.left);
	console.log(node.value);
	inOrder(node.right);
}

BinaryTree.prototype.postOrder = function() {
	postOrder(this.root);
}
function postOrder(node){
	if (node == null) return;
	nodes.push(node);
	postOrder(node.left);
	postOrder(node.right);
	console.log(node.value);
}


BinaryTree.prototype.bfs = function() {
    return bfs(this.root);
};
function bfs(node){
    var queue = [];
    var values = [];
    queue.push(node);
    while(queue.length > 0){
        var tempNode = queue.shift();
        values.push(tempNode.value);
        if (tempNode.left)
            queue.push(tempNode.left);  
        if (tempNode.right)
            queue.push(tempNode.right);
        
    }

    return values;
}

function makeTree(tree, array, first, last) {
    var mid = Math.floor((first + last) / 2);
    tree.addNode(array[mid], array[mid]);   
    if (first != mid)
        makeTree(tree, array, first, mid);
    if (last > mid + 1)
        makeTree(tree, array, mid + 1, last);
    return tree;
}

function boobleSort (array) {
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = i; j < array.length; j++) {
            if (array[i] > array[j]) {
                var tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }

    return array;
}

function arrayRandomizer (nodesCount, min, max) {
    for (var i = 0; i < nodesCount; i++)
        array[i] = Math.floor(min + Math.random() * (max - min));

}
function setLevelsToNodes (nodes, binary_tree, maxLevel) {
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].left)
            binary_tree.getNode(nodes[i].left.value).level = nodes[i].level + 1;

        if (nodes[i].right)
            binary_tree.getNode(nodes[i].right.value).level = nodes[i].level + 1;;

        if (maxLevel < nodes[i].level)
            maxLevel = nodes[i].level;
    }

    return maxLevel;
}

function setCanvasAttr (FOE, HON, radius, ML, WOLL, widthOfNode) {
    canvas.attr('height', getValidHeight(FOE, radius, ML));
    canvas.attr('width', getValidWidth(radius, WOLL, ML));
}

function setCoords (nodes, binary_tree, radius,  factorOfExtension) {
    nodes[0].x = (canvas.attr('width') / 2);
    nodes[0].y = radius * 3.5 / 3;
    for (i = 0; i < nodes.length; i++) {
        var xChange = (canvas.attr('width') / Math.pow(2, nodes[i].level + 1));
        if (nodes[i].left) {
            leftNode = binary_tree.getNode(nodes[i].left.value);
            leftNode.x =  nodes[i].x - xChange ;
            leftNode.y = nodes[i].y + radius * 3.5;

        }
        if (nodes[i].right) {
            rightNode = binary_tree.getNode(nodes[i].right.value);
            rightNode.x = nodes[i].x + xChange ;
            rightNode.y = nodes[i].y + radius * 3.5;
        }

    }
}

function getValidHeight (FOE, HON, ML) {
    var calcHeight = FOE * HON * ML;
    var clientHeight =
        document.compatMode == 'CSS1Compat' &&
        !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;

    if (calcHeight < (clientHeight - 20)) {
        calcHeight = (clientHeight - 20);
    }

    return calcHeight;
}

function getValidWidth (R, WOLL, ML) {
    var calcWidth = (2 * R + WOLL) * Math.pow(2, ML - 1) + WOLL * 2;
    var clientWidth =
        document.compatMode == 'CSS1Compat' &&
        !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;

    if (calcWidth < (clientWidth - 20)) {
        calcWidth = (clientWidth - 20);
    }

    return calcWidth;
}

function drawTree (nodes, binary_tree, cx, radius,  factorOfZoom) {
    for (i = 0; i < nodes.length; i++) {        
        drawLink(binary_tree, nodes[i], cx);         
        drawNode(nodes[i], radius, cx, factorOfZoom);
        
    }
}

function buildTree() {
    var maxLevel = setLevelsToNodes(nodes, binary_tree, -999);
    setCanvasAttr(factorOfExtension, heightOfNode, radius, maxLevel, widthOfLastLevel, widthOfNode);
    setCoords(nodes, binary_tree, radius,  factorOfExtension);
    drawTree(nodes, binary_tree, cx, radius, factorOfZoom);
}

function drawNode(node, radius, context) {

    context.beginPath();
    context.arc(node.x, node.y, radius, 0, Math.PI*2, true);
    context.fillStyle = "#00ff00";
    context.fill();   
   	context.fillStyle = 'black';
    context.font = "bold " + 14 + "px sans-serif";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(node.value, node.x, node.y);
    context.stroke();
}

function drawLink (binary_tree, node, cx) {
        cx.lineWidth = 3;
        if (node.left) {
            cx.moveTo(node.x, node.y);
            cx.lineTo(
                binary_tree.getNode(node.left.value).x, binary_tree.getNode(node.left.value).y); 
            cx.stroke();
        }
        if (node.right) {
            cx.moveTo(node.x , node.y);
            cx.lineTo(binary_tree.getNode(node.right.value).x, binary_tree.getNode(node.right.value).y);
            cx.stroke();
        }
    
}

function getNodeByCoords(x, y, radius) {
    var minXY = [];
    var maxXY = [];
    
        for (n = 0; n < nodes.length; n++) {
            minXY['x'] = nodes[n].x - radius;
            minXY['y'] = nodes[n].y - radius;
            maxXY['x'] = nodes[n].x + radius;
            maxXY['y'] = nodes[n].y + radius;
            if (x > minXY['x'] && x < maxXY['x'] && y > minXY['y'] && y < maxXY['y']) {
                return nodes[n]
            }
        }
     
}