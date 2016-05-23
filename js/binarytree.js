Node = function(key, value){    
    this.key        = key;
    this.value      = value;
    this.leftChild  = null;
    this.rightChild = null;
    this.count      = 0;
    this.coordX 	= 0;
    this.coordY 	= 0;
    this.height     = 1;    
};

BinaryTree = function(){};

BinaryTree.prototype.root = null;

BinaryTree.prototype.addNode = function(key, value){
    this.root = putNode( this.root, key, value );
};

function putNode(node, key, value){
    if ( !node ) return new Node(key, value);
    if (node.key > key )
        node.leftChild = putNode( node.leftChild, key, value);
     else if (node.key < key) 
        	node.rightChild = putNode(node.rightChild, key, value);
     else if (node.key == key)
        	node.value = value; 
    node.count = 1 + getSize(node.leftChild) + getSize(node.rightChild);
    return node;
}

function getSize(node){
    if (!node) return 0;
    return node.count;
}

BinaryTree.prototype.getNode = function(key){

    var currentNode = this.root;

    while (currentNode != null){
        if (currentNode.key > key) currentNode = currentNode.leftChild;
        else if (currentNode.key < key) currentNode = currentNode.rightChild;
        else if (currentNode.key == key ) return currentNode;
    }

    return null;
};

BinaryTree.prototype.getMinNode = function(){
    return getMin(this.root);
};
function getMin(node){

    if (!node.leftChild) return node;
    return getMin(node.leftChild);
}

BinaryTree.prototype.getMaxNode = function(){
    return getMax(this.root);
};
function getMax(node){

    if (!node.rightChild) return node;

    return getMax(node.rightChild);
}

BinaryTree.prototype.deleteMin = function(){
    deleteMin(this.root);
};
function deleteMin(node){
    if (node.leftChild == null) 
    	return node.rightChild;
    node.leftChild = deleteMin(node.leftChild);
    node.count = 1 + getSize(node.leftChild) + getSize(node.rightChild);
    return node;
}

BinaryTree.prototype.floor = function(key){
    var n = getFloor(this.root, key);
    return n;
};
function getFloor(node, key){
    if ( node == null ) return null;
    if (node.key == key ) return node;
    if (node.key > key) return getFloor(node.leftChild, key);
    var x = getFloor(node.rightChild, key);
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
    if (node.key < key) return getCeil(node.rightChild, key);
    var x = getCeil(node.leftChild, key);
    if (x) return x;
    return node;
}

BinaryTree.prototype.deleteNode = function(key){
    this.root = deleteNode(this.root, key);
};
function deleteNode(node, key){
    if (!node) return null;
    if (node.key > key) node.leftChild = deleteNode(node.leftChild, key);
    else if (node.key < key) node.rightChild = deleteNode(node.rightChild, key);
    else {
        if (!node.rightChild) return node.leftChild;
        if (!node.leftChild) return node.rightChild;
        var t = node;
        node = getMin(t.rightChild);
        node.rightChild = deleteMin(t.rightChild);
        node.leftChild = t.leftChild;
    }
    node.count = 1 + getSize(node.leftChild) + getSize(node.rightChild);
    return node;
}

BinaryTree.prototype.preOrder = function() {
    preOrder(this.root);
};
function preOrder(node){
    if (node == null) return;
    nodes.push(node);
    preOrder(node.leftChild);
    preOrder(node.rightChild);
}
BinaryTree.prototype.inOrder = function() {
	inOrder(this.root);
}
function inOrder(node){
	if (node == null) return;
	nodes.push(node);
	inOrder(node.leftChild);
	console.log(node.value);
	inOrder(node.rightChild);
}

BinaryTree.prototype.postOrder = function() {
	postOrder(this.root);
}
function postOrder(node){
	if (node == null) return;
	nodes.push(node);
	postOrder(node.leftChild);
	postOrder(node.rightChild);
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
        if (tempNode.leftChild)
            queue.push(tempNode.leftChild);  
        if (tempNode.rightChild)
            queue.push(tempNode.rightChild);
        
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
        if (nodes[i].leftChild)
            binary_tree.getNode(nodes[i].leftChild.value).height = nodes[i].height + 1;

        if (nodes[i].rightChild)
            binary_tree.getNode(nodes[i].rightChild.value).height = nodes[i].height + 1;;

        if (maxLevel < nodes[i].height)
            maxLevel = nodes[i].height;
    }

    return maxLevel;
}

function setCanvasAttr (FOE, HON, radius, ML, WOLL, widthOfNode) {
    canvas.attr('height', getValidHeight(FOE, radius, ML));
    canvas.attr('width', getValidWidth(radius, WOLL, ML));
}

function setCoords (nodes, binary_tree, radius,  factorOfExtension) {
    nodes[0].coordX = (canvas.attr('width') / 2);
    nodes[0].coordY = radius * 3.5 / 3;
    for (i = 0; i < nodes.length; i++) {
        var xChange = (canvas.attr('width') / Math.pow(2, nodes[i].height + 1));
        if (nodes[i].leftChild) {
            leftNode = binary_tree.getNode(nodes[i].leftChild.value);
            leftNode.coordX =  nodes[i].coordX - xChange ;
            leftNode.coordY = nodes[i].coordY + radius * 3.5;

        }
        if (nodes[i].rightChild) {
            rightNode = binary_tree.getNode(nodes[i].rightChild.value);
            rightNode.coordX = nodes[i].coordX + xChange ;
            rightNode.coordY = nodes[i].coordY + radius * 3.5;
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
    context.arc(node.coordX, node.coordY, radius, 0, Math.PI*2, true);
    context.fillStyle = "#00ff00";
    context.fill();   
   	context.fillStyle = 'black';
    context.font = "bold " + 14 + "px sans-serif";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(node.value, node.coordX, node.coordY);
    context.stroke();
}

function drawLink (binary_tree, node, cx) {
        cx.lineWidth = 3;
        if (node.leftChild) {
            cx.moveTo(node.coordX, node.coordY);
            cx.lineTo(
                binary_tree.getNode(node.leftChild.value).coordX, binary_tree.getNode(node.leftChild.value).coordY); 
            cx.stroke();
        }
        if (node.rightChild) {
            cx.moveTo(node.coordX , node.coordY);
            cx.lineTo(binary_tree.getNode(node.rightChild.value).coordX, binary_tree.getNode(node.rightChild.value).coordY);
            cx.stroke();
        }
    
}

