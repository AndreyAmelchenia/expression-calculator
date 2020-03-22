function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const arr = [0,1,2,3,4,5,6,7,8,9,'+','-','*','/','(',')'];
    expr = expr.split('');
    n1 = [];
    
    expr.forEach(elem => {
        arr.forEach(el => {
            if (elem != ' '){
                if (el == elem){
                    n1.push(el);
                }
            }    
        })
    })

    let left = 0;
    let right =0;
    for (let i=0; i < n1.length; i++ ){
        switch(n1[i]){
            case '(':
                left++
            break;
            case ')':
                right++ 
            break;
        } 
    } 

    if(right != left){
        throw  'ExpressionError: Brackets must be paired';
    }

    const n2 = [];
    let num1 = [] ;
 
    for (let i=0; i < n1.length; i++ ){
        if(typeof n1[i] === 'number'){
        num1.push(n1[i]);
        } else {
            if(typeof n1[i] === 'string'){
                if (num1.length != 0 ){
                    q = 0;
                    num1.forEach(el => {q = q*10 + el})
                    n2.push(q)
                }
                num1 = [];
                n2.push(n1[i])
            }
        } 
    }

    if (num1){
        if (num1.length != 0 ){
            q = 0;
            num1.forEach(el => {q = q*10 + el})
            n2.push(q)
        } 
    }

    for (let i = 0; i< n2.length; i++){
        if (n2[i] === '/'){
            if (n2[i+1] === 0){
                throw  'TypeError: Division by zero.';
            }
        }
    }

    leftRight(n2);

    function leftRight(arr) {
        let left1 = 0;
        let right1 = 0;
        for (let i=0; i< arr.length; i++){
            switch(arr[i]){
                case '(':
                    left1 = i;
                    break
                case ')':
                    right1 = i;
                    const arr1 = arr.slice(left1+1,right1);
                    one(arr1);
                    two(arr1);
                    arr.splice(left1,(right1-left1+1),num);
                    leftRight(arr);
                    break
                default:
                    break
            }      
        }
    }    

    one (n2);

    function one (arr) {        
        for (let i = 0; i< arr.length; i++){
            if(arr[i] === '*' || arr[i] === '/'){
                switch(arr[i]){
                    case '*':
                        num = arr[i-1]*arr[i+1];
                         arr.splice(i-1,3,num);
                    break;
                    case '/':                        
                            num = arr[i-1]/arr[i+1];
                            arr.splice(i-1,3,num);
                        
                    break;
                }
                i = i - 1;
            }
        }
    }

    two(n2)

    function two (arr){
        num = arr[0];
        for (let i = 0; i< arr.length; i++){
            switch(arr[i]){
                case '+':
                    num = num+arr[i+1];
                    break;
                case '-':
                    num = num-arr[i+1];
                    break;
            }   
        }
    }

    num = num*10000;
    num = Math.round(num);
    num = num/10000;
    return num;
}

module.exports = {
    expressionCalculator
}