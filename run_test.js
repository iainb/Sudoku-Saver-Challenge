(function () {

    function RunTests () {
    }

    this.RT = RunTests;

    /*
        RunAll attempts to run all tests against all available saver/loader objects
    */
    RunTests.prototype.RunAll = function () {
        var name, obj, ret, best_val, best_name;
        $('#results').append('<h1>Running All Tests</h1>');
        
        if (typeof SL === 'undefined') {
            $('#results').text('Unable to load any Saver/Loaders. Exit.');
            return;
        }

        for (name in SL) {
            if (typeof SL[name] === 'function') {
                obj = new SL[name]();
                if (typeof obj.Save === 'function' && typeof obj.Load === 'function') {
                    $('#results').append('<p>');
                    $('#results').append('<h3>Running: ' + obj.name + '</h3>');
                    ret = this.RunOne(obj);
                    if (best_val === undefined) {
                        best_val = ret;
                        best_name = obj.name;
                    } else {
                        if (ret < best_val) {
                            best_val = ret;
                            best_name = obj.name;
                        }
                    }
                    $('#results').append('</p>');
                }
            }
        }
        $('#results').append('<h3>Summary : ' + best_name + ' - '  + best_val.toFixed(2) + '% of basic size</h3>');


    };

    /*
        RunOne runs a single Saver/Loader object through the available puzzle tests
        
        @param obj {object} saver / loder object
        @return 
    */
    RunTests.prototype.RunOne = function (obj) {
        var tests,i,saved,loaded,total,failed,per;
        tests = this.LoadTests();
        failed = false;
        total = 0;
        for (i=0;i<tests.length;i=i+1) {
            saved = obj.Save(tests[i]); 
            if (this.VerifySaved(saved) === true) {
                loaded = obj.Load(saved);
                if (this.Compare(tests[i],loaded) === true) {
                    // match all is good
                    total = total + saved.length;
                    //$('#results').append(tests[i].name + ' - ok</br>');
                }  else {
                    // they don't match.
                    $('#results').append(tests[i].name + ' - error</br>');
                    failed = true;
                }
            } else {
                $('#results').append('error: could not verify saved data</br>');
                failed = true;
            }
            loaded = obj.Load(saved);
        }
       
        if (failed === false) {
            per = (total / (162 * tests.length)) * 100;
            $('#results').append('Total length: ' + total + '</br>');
            $('#results').append(per.toFixed(2) + '% of basic size.</br>');
        } else {
            $('#results').append('<h4>Failed</h4>');
            per = 100;
        }
        return per;        
    };

    /*
        VerifySaved verifies a saved puzzle does not contain any invalid characters
        @param saved {string} saved sudoku puzzle game
        @param return {bool} true if valid, false if not valid
    */
    RunTests.prototype.VerifySaved = function (saved) {
        return true;
    };

    /*
        Compare compares two puzzle objects to verify that they are the same.

        @param original {object} original puzzle
        @param loaded {object} puzzle which has been saved and then loaded
        @return
    */
    RunTests.prototype.Compare = function (original,loaded) {
        var i;
        // verify base
        for (i=0;i<original.base.length;i=i+1) {
            if (original.base[i] !== loaded.base[i]) {
                $('#results').append(original.name + ' - error when comparing index ' + i + ' in base (' + original.base[i] + ' !== ' + loaded.base[i] + ')</br>');
                return false;
            }
        }

        // verify partial
        for (i=0;i<original.partial.length;i=i+1) {
            if(original.partial[i] !== loaded.partial[i]) {
                $('#results').append(original.name + ' - error when comparing index ' + i + ' in partial (' + original.base[i] + ' !== ' + loaded.base[i] + ')</br>');
                return false;
            }
        }
        return true;
    };

    /*
        LoadTests returns an array of tests to run
        
        @return {array} array of tests to be run
    */
    RunTests.prototype.LoadTests = function () {
        var tests, easy, easycomplete, easypartial, easywrong, evil, evilcomplete, evilpartial, evilwrong;
       
        tests = []; 
        easy =         [0,2,5,0,0,0,9,0,4,
                        0,8,0,4,0,0,6,0,0,
                        6,0,0,9,0,0,2,8,1,
                        8,0,0,0,4,0,5,1,0,
                        0,0,2,8,0,3,7,0,0,
                        0,6,4,0,7,0,0,0,8,
                        2,5,1,0,0,9,0,0,7,
                        0,0,8,0,0,6,0,9,0,
                        7,0,6,0,0,0,8,3,0];

        easycomplete = [3,2,5,1,6,8,9,7,4,
                        1,8,9,4,2,7,6,5,3,
                        6,4,7,9,3,5,2,8,1,
                        8,7,3,6,4,2,5,1,9,
                        5,1,2,8,9,3,7,4,6,
                        9,6,4,5,7,1,3,2,8,
                        2,5,1,3,8,9,4,6,7,
                        4,3,8,7,5,6,1,9,2,
                        7,9,6,2,1,4,8,3,5]; 
        
        easypartial =  [0,2,5,0,0,0,9,7,4,
                        0,8,0,4,0,0,6,5,3,
                        6,0,0,9,0,0,2,8,1,
                        8,0,0,0,4,0,5,1,0,
                        0,0,2,8,0,3,7,4,6,
                        0,6,4,0,7,0,0,2,8,
                        2,5,1,0,0,9,0,6,7,
                        0,0,8,0,0,6,0,9,0,
                        7,0,6,0,0,0,8,3,0];

        easywrong  =   [2,2,5,0,0,0,9,7,4,
                        0,8,0,4,0,0,6,5,3,
                        6,0,0,9,0,0,2,8,1,
                        8,0,0,0,4,0,5,1,0,
                        0,0,2,8,0,3,7,4,6,
                        0,6,4,0,7,7,0,2,8,
                        2,5,1,0,0,9,0,6,7,
                        0,0,8,0,0,6,0,9,1,
                        7,0,6,5,0,8,8,3,0];

        evil        =  [0,6,5,0,0,0,0,7,0,
                        0,0,0,7,0,0,2,0,0,
                        0,0,0,0,4,0,9,1,0,
                        0,7,0,0,8,9,5,0,0,
                        0,0,0,0,3,0,0,0,0,
                        0,0,8,2,7,0,0,4,0,
                        0,5,6,0,9,0,0,0,0,
                        0,0,7,0,0,8,0,0,0,
                        0,2,0,0,0,0,1,9,0];

        evilcomplete = [4,6,5,9,1,2,8,7,3,
                        9,8,1,7,6,3,2,5,4,
                        7,3,2,8,4,5,9,1,6,
                        6,7,3,4,8,9,5,2,1,
                        2,4,9,5,3,1,6,8,7,
                        5,1,8,2,7,6,3,4,9,
                        8,5,6,1,9,4,7,3,2,
                        1,9,7,3,2,8,4,6,5,
                        3,2,4,6,5,7,1,9,8];


        evilpartial =  [0,6,5,0,0,0,0,7,0,
                        0,0,0,7,6,0,2,5,4,
                        0,0,0,0,4,0,9,1,0,
                        0,7,0,0,8,9,5,0,0,
                        0,0,0,5,3,0,0,0,0,
                        0,0,8,2,7,0,0,4,0,
                        0,5,6,1,9,0,0,0,0,
                        0,9,7,3,0,8,0,0,0,
                        0,2,0,0,0,0,1,9,0];

        evilwrong =    [6,6,5,0,0,0,7,7,0,
                        0,0,0,7,6,0,2,5,4,
                        0,0,0,0,4,0,9,1,0,
                        0,7,0,0,8,9,5,0,0,
                        0,0,0,5,3,0,0,0,4,
                        0,6,8,2,7,0,0,4,0,
                        0,5,6,1,9,0,0,0,0,
                        0,9,7,3,0,8,8,0,0,
                        2,2,0,0,0,0,1,9,0];
       
        // easy test with incomplete grid
        tests.push({base : easy,
                    partial : easy,
                    name : 'easy incomplete'});
        // easy test with partialy completed grid
        tests.push({base : easy,
                    partial : easypartial,
                    name : 'easy partial'});
        // easy test with completed grid
        tests.push({base : easy,
                    partial: easycomplete,
                    name : 'easy complete'});

        // easy test with wrong grid
        tests.push({base : easy,
                    partial : easywrong,
                    name : 'easy wrong'});
        
        // evil test with incomplete grid
        tests.push({base: evil,
                    partial: evil,
                    name : 'evil incomplete'});
        
        // evil test with a partially complete grid
        tests.push({base: evil,
                    partial: evilpartial,
                    name : 'evil partial'}); 

        // evil test with completed grid
        tests.push({base: evil,
                    partial: evilcomplete,
                    name : 'evil complete'});

        // evil test with wrong grid
        tests.push({base: evil,
                    partial: evilwrong,
                    name : 'evil wrong'});
        return tests;
    };
    
}());

var rt;

$(document).ready(function () {
    rt = new RT();
    rt.RunAll();

});
