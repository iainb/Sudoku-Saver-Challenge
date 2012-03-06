(function () {

    /*
        Skeleton does not do anything it is just a placeholder
    */
    function SimpleRunLength () {
        this.name = 'SimpleRunLength Saver/Loader';
    }
    
    if (typeof this.SL === 'undefined') {
        this.SL = {};
    }

    this.SL.SimpleRunLength = SimpleRunLength;

    /*
        Save takes an input object contains which has 
        two properties. Base which is an array 81 elements long containing 
        the base sudok grid and partial, another array 81 elements long
        containing a partially (or totally) (or not) completed grid.

        @parm input {object} input object 
        @return {string} encoded string
    */
    SimpleRunLength.prototype.Save = function (input) {
        var r;
        r = '';
        
        r = this.EncodeOne(input.base) + this.EncodeOne(input.partial); 
        return r;
    };

    /*
        EncodeOne encodes a single sudoku grid, replacing
        consecutive zero's with a character which represents
        the number of consecutive zeros.
    */
    SimpleRunLength.prototype.EncodeOne = function (a) {
        // 65 = A
        var i,r;
        r = '';
        count = 0;
        for (i=0;i<a.length;i=i+1) {
            if (a[i] !== 0) {
                if (count > 0) {
                    r = r + String.fromCharCode(64 + count);
                }
                r = r + a[i]; 
                count = 0;
            } else {
                count = count + 1;
            }
        }

        if (count > 0) {
            r = r + String.fromCharCode(64 + count);
        }
        return r;
    };


    /*
        Load takes the string encoded by Save and
        converts it back into the input object taken by the
        Encode.

        @param s {string} 
        @return {object} decoded object
    */
    SimpleRunLength.prototype.Load = function (str) {
        var r,t;

        r = {};
        t = this.DecodeOne(str,0);
        r.base = t.arr;

        t = this.DecodeOne(str,t.pos);
        r.partial = t.arr;

        return r;
    };

    SimpleRunLength.prototype.DecodeOne = function(str,start) {
        var a,i,j,code,decoded;
        a = [];
        decoded = 0;
        for (i=start;i<str.length;i=i+1) {
            if (decoded === 81) {
                return { arr: a, pos: i };
            }
            code = str.charCodeAt(i);
            if (code >= 65) {
                for (j=0;j<code - 64;j=j+1) {
                    a.push(0);
                    decoded = decoded + 1;
                }
            } else {
                a.push(parseInt(str[i],10));
                decoded = decoded + 1;
            }
        }
        return { arr: a, pos: i} ;        
    };        

}());
