(function () {

    /*
        Basic is one of the simplest save/loaders
        possible. It takes the two arrays converts 
        them into strings and then joins them together.

        The first 81 characters are the base grid and then
        the following 81 character are the partially completed
        grid.

        The result will always be 162 characters long.
    */
    function Basic () {
        this.name = 'Basic Saver/Loader';
    }
    
    if (typeof this.SL === 'undefined') {
        this.SL = {};
    }

    this.SL.Basic = Basic;

    /*
        Save takes an input object contains which has 
        two properties. Base which is an array 81 elements long containing 
        the base sudok grid and partial, another array 81 elements long
        containing a partially (or totally) (or not) completed grid.

        @parm input {object} input object 
        @return {string} encoded string
    */
    Basic.prototype.Save = function (input) {
        var r;
        r = input.base.join('');
        r = r + input.partial.join('');
        return r;
    };

    /*
        Load takes the string encoded by Save and
        converts it back into the input object taken by the
        Encode.

        @param s {string} 
        @return {object} decoded object
    */
    Basic.prototype.Load = function (s) {
        var r;
        r = {};
        r.base = s.slice(0,81).split('');
        r.partial = s.slice(81,162).split('');

        r.base = r.base.map(function (val) { return parseInt(val,10); });
        r.partial = r.partial.map(function (val) { return parseInt(val,10); });

        return r;
    };

}());
