(function () {

    /*
        Skeleton does not do anything it is just a placeholder
    */
    function Skeleton () {
        this.name = 'Skeleton Saver/Loader';
    }
    
    if (typeof this.SL === 'undefined') {
        this.SL = {};
    }

    this.SL.Skeleton = Skeleton;

    /*
        Save takes an input object contains which has 
        two properties. Base which is an array 81 elements long containing 
        the base sudok grid and partial, another array 81 elements long
        containing a partially (or totally) (or not) completed grid.

        @parm input {object} input object 
        @return {string} encoded string
    */
    Skeleton.prototype.Save = function (input) {
        return '';
    };

    /*
        Load takes the string encoded by Save and
        converts it back into the input object taken by the
        Encode.

        @param s {string} 
        @return {object} decoded object
    */
    Skeleton.prototype.Load = function (s) {
        var r;

        r = {};
        r.base = [];
        r.partial = [];

        return r;
    };

}());
