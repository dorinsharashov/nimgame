export const calculateZeroNimSum = (arr) => {
    let biggestNum = 0;
    let pileIndex = 0;
    let checkNimSum = 0;
    let pileCount = 0;
    let nimSum = arr.reduce((total, num, index) => {
        if(biggestNum < num){
            biggestNum = num;
            pileIndex = index
        }
        return total ^ num}, 0);
    if(nimSum === 0){
        return false;
    } else{
        let tempArr = arr;
        let tempNimSum = nimSum;
        let bigest2pow = Math.pow(2,dec2bin(biggestNum).length)
        while(bigest2pow !== 0){
            if((bigest2pow & tempNimSum) !== 0){
                tempArr.forEach((count, index) => {
                    if((count & bigest2pow) !== 0){
                        pileIndex = index;
                        pileCount = count;

                    }
                });
                break;
            }else

            bigest2pow = bigest2pow >>> 1;
        }
        // for (let i = 0 ; i < tempArr.length ; i++){
        //     if((bigest2pow & tempNimSum) !== 0){
        //         console.log(bigest2pow & tempNimSum);
        //         tempArr.forEach((count, index) => {
        //             if((count & bigest2pow) !== 0){
        //                 pileIndex = index;
        //                 pileCount = count;
        //
        //             }
        //         });
        //         break;
        //     }else{
        //         bigest2pow = bigest2pow >>> 1;
        //     }
        //
        // }
        checkNimSum = arr[pileIndex] ^ nimSum;
        return {
            pileIndex: pileIndex,
            count: arr[pileIndex] - checkNimSum
        };


        // let tempArr = arr;
        // let sum = 0;
        // let indexs = [];
        // for (let i = 0 ; i < tempArr.length ; i++){
        //     sum = 0;
        //     indexs = [];
        //     tempArr.map((count, index) => {
        //         if(count << 1 === 1){
        //             sum ++;
        //         }
        //         indexs.push(index);
        //         return count << 1;
        //     });
        //     if(sum % 2 !== 0){
        //         leftMostBit = indexs[0];
        //         break;
        //     }
        // }
        //
        // let checkNimSum = arr[leftMostBit] ^ nimSum;
        // return {
        //     pileIndex: leftMostBit,
        //     count: arr[leftMostBit] - checkNimSum
        // };
    }
    // let biggestNum = 0;
    // let pileIndex = 0;
    // let checkNimSum = 0;
    // let nimSum = arr.reduce((total, num, index) => {
    //     if(biggestNum < num){
    //         biggestNum = num;
    //         pileIndex = index
    //     }
    //     return total ^ num}, 0);
    // if(nimSum === 0){
    //     return false;
    // }else{
    //     checkNimSum = biggestNum ^ nimSum;
    //     return {
    //         pileIndex: pileIndex,
    //         count: biggestNum - checkNimSum
    //     };
    // }
}

const dec2bin = (dec) => {
    return (dec >>> 0).toString(2);
}