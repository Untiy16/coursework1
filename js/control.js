 canvas = $('#canvas');
    var array = [];
    binaryTree = new BinaryTree();
    nodes = [];    
    var c = document.getElementById('canvas');
    var cx = c.getContext("2d");
    var canvasSizeInc;   
    nodesCount = 15;     
    nodeRadius = 25;     
    widthOfLastLevel = nodeRadius / 2;
    canvasSizeInc = nodeRadius / 20;
    canvasDynamicSize = 1.5 * canvasSizeInc;  
    arrayRandomizer(nodesCount, -500, 500);
    boobleSort(array);
    makeTree(binaryTree, array, 0, nodesCount);
    binaryTree.preOrder();
    buildTree();          


    
    function findElem(){
        if($('#findInput').val()!="")
        {
            var findInput = parseInt($('#findInput').val());
            var a = binaryTree.getNode(findInput);
            if (a == null) 
                alert("Такого елемента немає в дереві!");
            else 
                alert("Елемент "+a.value+" знаходиться на " +a.height+" рівні.");
        }
    }
 
   
   function finder(input) {
        for (var i = 0; i < array.length; i++) {
            if(array[i]==input)
            return i;           
        }
        return -1;
    }

    function delElem() {
        if( $('#delInput').val() == "" && nodesCount > 1) {
            array.splice(Math.floor(nodesCount + Math.random() * (1 - (nodesCount))), 1);
            nodesCount--;
        }
        else if (nodesCount <= 1) {alert("Залишився останній елемент!"); }
        else {
            var delInput = parseInt($('#delInput').val());
            var inside = -1;    
            inside = finder(delInput);            
            if (inside != -1 && inside != undefined && !isNaN(delInput)) {                
                nodesCount -= 1;
                array.splice(inside, 1);
                rebuildTree();
            }
            else if (isNaN(delInput)) 
                alert("Тільки числа!"); 
            else
                alert("Такого елемента немає!"); 
        }
        rebuildTree();  
  }

   function addElem() {
        if( $('#addInput').val() == "")
        {
            array.push(Math.floor(300 + Math.random() * (1 - (300))));
            nodesCount++;            
        }
        else
        {
            var addInput = parseInt($('#addInput').val());
            console.log(addInput);
            var inside = -1;    
            inside = finder(addInput); 
            if (inside == -1 && inside != undefined && !isNaN(addInput)) { 
                array.push($('#addInput').val());
                nodesCount++;
            }
            else if (isNaN(addInput)) 
                 alert("Тільки числа!"); 
            else
                alert("Такой елемент вже існує!"); 

        }        
        rebuildTree();
    }

    function rebuildTree(){
        delete binaryTree;
        nodes = [];
        binaryTree = new BinaryTree();
        boobleSort(array);
        makeTree(binaryTree, array, 0, nodesCount);
        binaryTree.preOrder();
        buildTree();   
    }