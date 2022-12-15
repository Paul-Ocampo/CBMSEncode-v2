//#region extended jQuery functions
jQuery.fn.extend({
    readOnly: function () {
        $(this).attr("readonly", "readonly");
    }
});

jQuery.fn.extend({
    required: function () {
        $(this).attr("required", "required");
    }
});

jQuery.fn.extend({
    notRequired: function () {
        $(this).attr("required", false);
    }
});
//#endregion
//#region variables
var requiredFieldsCount;
var form_id, memberID, deceasedID;
var phsize, numofw, numfam, numpreg, numunipar, numpwd, mdead;
var ofws, fams, pregnants, unipars, pwds;
var hpq_mem_length, hpq_death_length, hpq_mem_TEMP_length, hpq_death_TEMP_length, hpq_prog_TEMP_length;
var nucfamchoices;
var hpq_mem_ref;
var hpq_edit_Mode = 1;
var mem_edit_Mode = false, deceased_edit_Mode = false, prog_edit_Mode = false;
var mem_index_edited, deceased_index_edited, prog_index_edited;
var dateToday = new Date();
var file_name = "";
var instancelist = {}, userDetails = {}, hpq_main = {}, hpq_data = {};
var hpq_mem = [], hpq_death = [], hpq_prog = [], hh_fams = [];
var username = "";
var accessLevel = 0;
var instanceID = "";
var instances_to_upload = {};
var map;
var osmTiles;
var MBTiles;
var brgyBounds;
var latitude = 0, longitude = 0, accuracy = 1;
var locationCircle;
var totalEncoded, encodedToday, validEncoded, invalidEncoded;
var getL;
var getC;
var thisFile = "";
var exitMode;
var hh_head_disabled = false, hh_spouse_disabled = false;
var xf_head_disabled = false, xf_spouse_disabled = false;
var mem_is_ofw = false, mem_is_unipar = false, mem_is_pwd, mem_is_pregnant = false;
var autocomplete_last_name = [], autocomplete_mid_name = [];
var pages_nav_li;
var autoSaveInterval;

const _brgy = {
    "001": "Agnas (San Miguel Island)",
    "002": "Bacolod",
    "003": "Bangkilingan",
    "004": "Bantayan",
    "005": "Baranghawon",
    "006": "Basagan",
    "007": "Basud (Pob.)",
    "008": "Bogñabong",
    "009": "Bombon (Pob.)",
    "010": "Bonot",
    "012": "Buang",
    "013": "Buhian",
    "014": "Cabagñan",
    "015": "Cobo",
    "016": "Comon ",
    "017": "Cormidal",
    "018": "Divino Rostro (Pob.)",
    "019": "Fatima",
    "020": "Guinobat",
    "021": "Hacienda (San Miguel Island)",
    "022": "Magapo",
    "023": "Mariroc",
    "024": "Matagbac",
    "025": "Oras",
    "026": "Oson",
    "027": "Panal",
    "029": "Pawa",
    "030": "Pinagbobong",
    "031": "Quinale Cabasan (Pob.)",
    "032": "Quinastillojan",
    "033": "Rawis (San Miguel Island)",
    "034": "Sagurong (San Miguel Island)",
    "035": "Salvacion",
    "036": "San Antonio",
    "037": "San Carlos",
    "011": "San Isidro (Boring)",
    "038": "San Juan (Pob.)",
    "039": "San Lorenzo",
    "040": "San Ramon",
    "041": "San Roque",
    "042": "San Vicente",
    "044": "Santo Cristo (Pob.)",
    "045": "Sua-Igot",
    "046": "Tabiguian",
    "048": "Tagas",
    "049": "Tayhi (Pob.)",
    "050": "Visita (San Miguel Island)"
}
const _prog = {
    1: "1 - Sustainable Livelihood Program (DSWD)",
    2: "2 - Food for School",
    3: "3 - Food for Work/Cash for Work",
    4: "4 - Social Pension for Indigent Senior Citizen",
    5: "5 - Pantawid Pamilyan Pilipino Program (4Ps)/KALAHI-CIDDSS/Listahan",
    6: "6 - Agrarian Reform Community Development Program (ARCDP)",
    7: "7 - Training for Work Scholarship Program (TWSP)",
    8: "8 - Community-Based Employment Program (CBEP)",
    9: "9 - Health care Insurance (Maxicare/Medicare/Intellicare/etc.)",
    10: "10 - Gender and Development Programs",
    11: "11 - Health Care Assistance Program",
    12: "12 - Supplemental Feeding Program",
    13: "13 - Educational Assistance/Scholarship Program",
    14: "14 - Skills or Livelihood Training Program",
    15: "15 - Credit/Lending Program",
    16: "16 - Housing Program",
    17: "17 - LGU Gift Giving / Pamaskong Handog",
    18: "18 - Longevity Cash Gift for Indigent Seinor Citizen",
    19: "19 - Other type of program"
}
const _cod = {
    1: "Heart disease",
    2: "Disease of the Vascular System",
    3: "Pneumonia",
    4: "Tuberculosis",
    5: "Cancer",
    6: "Diarrhea",
    7: "Complication during pregnancy of childbirth",
    8: "Vehicular accident",
    9: "Diabetes",
    10: "Disease of the Lungs",
    11: "Disease of the Kidney",
    12: "Murdered",
    13: "Others"
}
const _sex = {
    1: "Male",
    2: "Female"
}
const _civstat = {
    1: "Single",
    2: "Married",
    3: "Widow",
    4: "Separated",
    5: "Common Law/Live-In",
    6: "Don't know"
}
const _reln = {
    1: "Head",
    2: "Spouse",
    3: "Son/Daughter",
    4: "Son-in-Law/Daughter-in-Law",
    5: "Grandchildren",
    6: "Parents",
    7: "Father-in-Law/Mother-in-Law",
    8: "Brother/Sister",
    9: "Uncle/Aunt",
    10: "Grandparents",
    11: "Nephew/Niece",
    12: "Housemaid/Houseboy",
    13: "Others"
}
const _hpq_stat = {
    0: "Incomplete",
    1: "Not validated",
    2: "Validated",
    3: "Uploaded"
}
const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
};
//#endregion

$(document).ready(function (e) {

    var isLoggedIn = Android.checkLoggedIn();

    if (isLoggedIn != "true") {
        window.location.href = "login.html";
    }

    $("#msg-modal").modal("show").find("#msg-message").html("Loading raster database.<br>Please wait...");

    MBTiles = L.tileLayer.mbTiles('https://appassets.androidplatform.net/raster/raster.mbtiles', {
        minZoom: 1,
        maxZoom: 19
    });

    MBTiles.on('databaseloaded', function (ev) {
        setTimeout(() => {
            $("#msg-modal").modal("hide");
            loaded();
        }, 500);
        console.info('MBTiles DB loaded', ev.error);
    });

    MBTiles.on('databaseerror', function (ev) {
        setTimeout(() => {
            $("#msg-modal").modal("hide");
            $("#msg-modal").modal("show").find("#msg-message").html("Raster file not found.<br>Please download the raster file and restart the app.");
            loaded();
        }, 250);
        console.info('MBTiles DB error', ev.error);
    });

    brgyBounds = L.geoJSON(brgy_bounds, {
        style: {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0,
            fillColor: 'white'
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.B_NM;
    });

    osmTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        zoomControl: false,
        minZoom: 1,
        maxZoom: 19,
        attribution: 'CBMS Tabaco'
    })

});

function loaded() {

    userDetails = JSON.parse(Android.getLoggedInUser());
    userID = userDetails["user_id"];
    accessLevel = userDetails["accessLevel"] * 1;
    Android.clearTemp();
    fetchInstancelist(loadList);
    username = userDetails["username"];
    $(".username").html(username);

}

//#region map modal
function geolocationCoordinates() {

    function success(pos) {
        const crd = pos.coords;

        $("#latitude").val(crd.latitude);
        $("#longitude").val(crd.longitude);

        latitude = $("#latitude").val();
        longitude = $("#longitude").val();
        accuracy = (crd.accuracy / 2);

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

}
function showMap() {

    $("#getLocModal").modal("show");

    latitude = $("#latitude").val();
    longitude = $("#longitude").val();

}
$("#getLocModal").on("shown.bs.modal", function (e) {

    map = L.map('map', {
        zoom: 19,
        center: [latitude, longitude]
    });

    osmTiles.addTo(map);

    MBTiles.addTo(map);

    brgyBounds.addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    locationCircle = L.circle([latitude, longitude], accuracy)
        .addTo(map)
        .bindPopup(`You are within ${accuracy} meters from this point.`).openPopup();
    //map.locate({ setView: true, maxZoom: 19 });

});
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    locationCircle.remove();
    //var locationMarker = L.circleMarker(e.latlng).addTo(map);

    locationCircle = L.circle(e.latlng, radius)
        .addTo(map)
        .bindPopup(`You are within ${radius} meters from this point.`).openPopup();
}
function onLocationError(e) {
    alert(e.message);
}
function getLocation() {

    map.locate({
        setView: true,
        animate: true,
        zoom: 19,
        enableHighAccuracy: true,
        timeout: 20000
    });

}
function getCoordinates() {

    var latlng = {};

    latlng = map.getCenter();

    $("#latitude").val(latlng.lat);
    $("#longitude").val(latlng.lng);

    $("#getLocModal").modal("hide");

}
$("#getLocModal").on("hidden.bs.modal", function (e) {

    map.remove();

});
//#endregion map modal
function home() {

    clearInterval(autoSaveInterval);

    $("#header").html(topbar_index);
    $("#page").html(main_index);
    $("#sidebar").attr("hidden", true);
    $(".required-field").hide();
    Android.clearTemp();
    fetchInstancelist(loadList);

}
function exit() {
    Swal.fire({
        title: 'Do you want to exit without saving?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {

            saveData('exit');
        } else if (result.isDenied) {

            home();
        }
    })
}
function logOut() {

    instancelist = null;
    instancelist = undefined;
    Swal.fire({
        title: 'Ready to leave?',
        text: 'Click "Logout" below if you are ready to end your current session.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            Android.logout();
            window.location.href = "login.html";
        }
    })

}
function fetchInstancelist(callback) {
    instancelist = JSON.parse(Android.getInstancelist());

    callback();
}
function loadList() {

    let c = [];
    totalEncoded = 0;
    encodedToday = 0;
    validEncoded = 0;
    invalidEncoded = 0;

    for (let key in instancelist["data"]) {
        thisFile = instancelist["data"][key]["fileName"];
        instanceID = instancelist["data"][key]["instanceID"];

        if (accessLevel == 2) {

            if (instancelist["data"][key]["encoder"] == userID) {

                totalEncoded++;

                if (new Date().toLocaleDateString() == new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()) encodedToday++;

                if (instancelist["data"][key]["hpq_stat"] == 0 || instancelist["data"][key]["hpq_stat"] == 1) invalidEncoded++;
                if (instancelist["data"][key]["hpq_stat"] == 2 || instancelist["data"][key]["hpq_stat"] == 3) validEncoded++;

                c.push(`<tr>
                            <td>
                                <div class="form-check">`);
                if (instancelist["data"][key]["hpq_stat"] == 2) {
                    c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="'${instanceID}">`);
                } else {
                    c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="${instanceID}" disabled>`);
                }
                c.push(`            <label class="form-check-label ml-1" for="${instanceID}">
                                        ${_brgy[instancelist["data"][key]["formDetail"]["brgy"]]}
                                    </label>
                                </div>
                            </td>
                            <td>${instancelist["data"][key]["formDetail"]["hcn"]}</td>
                            <td>${instancelist["data"][key]["formDetail"]["respondent"]}</td>
                            <td>${new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()}</td>
                            <td>${_hpq_stat[instancelist["data"][key]["hpq_stat"]]}</td>`);
                if (instancelist["data"][key]["hpq_stat"] != 3) {
                    c.push(`<td align="center">
                                <div class="dropdown">
                                    <a class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Option
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                            <i class="bi bi-eye text-info mr-1"></i>
                                            View
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" onclick="edit_hpq('${instancelist["data"][key]["fileName"]}');">
                                            <i class="bi bi-pencil text-success mr-1"></i>
                                            Edit
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" onclick="delete_hpq('${instancelist["data"][key]["fileName"]}');">
                                            <i class="bi bi-trash text-danger mr-1"></i>
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>`);
                } else {
                    c.push(`<td align="center">
                                <div class="dropdown">
                                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Action
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                            <i class="bi bi-eye text-success mr-1"></i> 
                                            View
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>`);
                }
            }
        } else if (accessLevel == 1) {

            totalEncoded++;

            if (new Date().toLocaleDateString() == new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()) encodedToday++;
            if (instancelist["data"][key]["hpq_stat"] == 0 || instancelist["data"][key]["hpq_stat"] == 1) invalidEncoded++;
            if (instancelist["data"][key]["hpq_stat"] == 2 || instancelist["data"][key]["hpq_stat"] == 3) validEncoded++;

            c.push(`<tr>
                        <td>
                            <div class="form-check">`);
            if (instancelist["data"][key]["hpq_stat"] == 2) {
                c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="'${instanceID}">`);
            } else {
                c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="${instanceID}" disabled>`);
            }
            c.push(`            <label class="form-check-label ml-1" for="${instanceID}">
                                    ${_brgy[instancelist["data"][key]["formDetail"]["brgy"]]}
                                </label>
                            </div>
                        </td>
                        <td>${instancelist["data"][key]["formDetail"]["hcn"]}</td>
                        <td>${instancelist["data"][key]["formDetail"]["respondent"]}</td>
                        <td>${new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()}</td>
                        <td>${_hpq_stat[instancelist["data"][key]["hpq_stat"]]}</td>`);
            if (instancelist["data"][key]["hpq_stat"] != 3) {
                c.push(`<td align="center">
                            <div class="dropdown">
                                <a class="btn btn-outline-secondary dropdown-toggle " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Option
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                        <i class="bi bi-eye text-info mr-1"></i> 
                                        View
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" onclick="edit_hpq('${instancelist["data"][key]["fileName"]}');">
                                        <i class="bi bi-pencil text-success mr-1"></i> 
                                        Edit
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" onclick="delete_hpq('${instancelist["data"][key]["fileName"]}');">
                                        <i class="bi bi-trash text-danger mr-1"></i> 
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>`);
            } else {
                c.push(`<td align="center">
                            <div class="dropdown">
                                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                        <i class="bi bi-eye text-success mr-1"></i> 
                                        View
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>`);
            }
        }
    }

    $("#dashdataTable").DataTable().destroy();
    $("#dashboardTable").html(c.join(""));

    setTimeout(() => {
        $("#total_encoded").html(totalEncoded);
        $("#encoded_today").html(encodedToday);
        $("#validated_hpq").html(validEncoded);
        $("#incomplete_hpq").html(invalidEncoded);
        $("#dashdataTable").DataTable();
    }, 250);
}
function recoverInstancelist() {

    if (Android.recoverInstancelist()) {
        fetchInstancelist(loadList);
    } else {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'Recovery failed.<br><br>Please check your storage permission.',
            icon: 'error',
        })
    }

}
function resetMainForm() {

    document.getElementById("addnew_form").reset();
    $("#int_date").val(dateToday.toLocaleDateString());
    $("#built_when").val(dateToday.getFullYear());
    $("#filename").val(-dateToday.getTime());
    $("#encoder").val(userID);

}
//#region form validation
function validate_main_form() { // ok

    computeIncome();

    requiredFieldsCount = 0;
    var thisElement;
    var nArray = [];

    $("#reqFields").html("");

    hh_head = 0;
    ofws = 0;
    unipars = 0;
    pwds = 0;
    pregnants = 0;

    numfam = $("#numfam").val();
    numofw = $("#numofw").val();
    numpreg = $("#numpreg").val();
    numunipar = $("#numunipar").val();
    numpwd = $("#numpwd").val();
    phsize = $("#phsize").val();
    mdead = $("#mdead").val();

    $.each(hpq_mem, function (i, item) {

        nArray.push(item.nucfam);

        if (item.ofwind == 1) ofws++;

        if (item.uniparind == 1) unipars++;

        if (item.pwdind == 1) pwds++

        if (item.sdg_pregind == 1) pregnants++;

    });

    fams = Math.max.apply(Math, nArray);

    let addNewForm = document.getElementById("addnew_form").elements;

    try {
        hpq_mem_length = hpq_mem.length;
    } catch (error) {
        hpq_mem_length = 0;
    }
    try {
        hpq_death_length = hpq_death.length;
    } catch (error) {
        hpq_death_length = 0;
    }


    //#region bunch of ifs
    if ($("#htype").val() == 5) {
        $(".htype_o_tr").show();
        $("#htype_o").required();
    } else {
        $(".htype_o_tr").hide();
        $("#htype_o").val("").notRequired();
    }
    if ($("#water").val() == 12) {
        $(".water_o_tr").show();
        $("#water_o").required();
    } else {
        $(".water_o_tr").hide();
        $("#water_o").val("").notRequired();
    }
    if ($("#toilet").val() == 7) {
        $(".toilet_o_tr").show();
        $("#toilet_o").required();
    } else {
        $(".toilet_o_tr").hide();
        $("#toilet_o").val("").notRequired();
    }
    if ($("#tenur").val() == 11) {
        $(".tenur_o_tr").show();
        $("#tenur_o").required();
    } else {
        $(".tenur_o_tr").hide();
        $("#tenur_o").val("").notRequired();
    }
    if ($("#elec_ind").val() == 1) {
        $(".elec_type_tr").show();
        $("#elec_type").required();
    } else {
        $(".elec_type_tr").hide();
        $("#elec_type").val("").notRequired();
    }
    if ($("#tenur").val() == 1 || ($("#tenur").val() >= 3 && $("#tenur").val() <= 7) || $("#tenur").val() == 9 || $("#tenur").val() == 11) {
        $(".imprnt_tr").show();
        $("#imprnt").required();
    } else {
        $(".imprnt_tr").hide();
        $("#imprnt").val("").notRequired();
    }
    if ($("#reloc_ind").val() == 1) {
        $(".reloc_tr").show();
        $(".reloc_inputs").required();
    } else {
        $(".reloc_tr").hide();
        $(".reloc_inputs").val("").notRequired();
    }
    if ($("#easement_ind").val() == 1) {
        $(".easement_type_tr").show();
        $("#easement_type").required();
    } else {
        $(".easement_type_tr").hide();
        $("#easement_type").val("").notRequired();
    }
    if ($("#haz_ind").val() == 1) {
        $(".haz_type_tr").show();
        $(".haz_inputs").required();
    } else {
        $(".haz_type_tr").hide();
        $(".haz_inputs").val("").notRequired();
    }
    if ($("#haz_type").val() == 1) {
        $(".haz_flood_tr").show();
        $(".haz_flood_inputs").required();
        $(".haz_volcano_tr").hide();
        $(".haz_volcano_inputs").val("").notRequired();
    } else if ($("#haz_type").val() == 2) {
        $(".haz_volcano_tr").show();
        $("#haz_volcano_dist").required();
        $(".haz_flood_tr").hide();
        $(".haz_flood_inputs").val("").notRequired();
    } else {
        $(".haz_flood_tr, .haz_volcano_tr").hide();
        $(".haz_flood_inputs, .haz_volcano_inputs").val("").notRequired();
    }
    if ($("#garb_other_ind").val() == 1) {
        $(".garb_other_o_tr").show();
        $("#garb_other_o").required();
    } else {
        $(".garb_other_o_tr").hide();
        $("#garb_other_o").val("").notRequired();
    }
    if ($("#garb_collect").val() == 1) {
        $(".garb_collector_tr").show();
        $(".garb_collect_inputs").required();
    } else {
        $(".garb_collector_tr, .garb_collector_freq_o_tr").hide();
        $(".garb_collect_inputs").val("").notRequired();
    }
    if ($("#garb_collector_freq").val() == 5) {
        $(".garb_collector_freq_o_tr").show();
        $("#garb_collector_freq_o").required();
    } else {
        $(".garb_collector_freq_o_tr").hide();
        $("#garb_collector_freq_o").val("").notRequired();
    }
    if ($("#calam_typhoon_ind").val() == 1) {
        $("#calam_typhoon_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_typhoon_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_typhoon_aid_ind").val() == 1) {
        $("#calam_typhoon_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_typhoon_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_flood_ind").val() == 1) {
        $("#calam_flood_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_flood_aid_ind, #calam_flood_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_flood_aid_ind").val() == 1) {
        $("#calam_flood_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_flood_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_drought_ind").val() == 1) {
        $("#calam_drought_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_drought_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_drought_aid_ind").val() == 1) {
        $("#calam_drought_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_drought_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_earthquake_ind").val() == 1) {
        $("#calam_earthquake_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_earthquake_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_earthquake_aid_ind").val() == 1) {
        $("#calam_earthquake_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_earthquake_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_eruption_ind").val() == 1) {
        $("#calam_eruption_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_eruption_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_eruption_aid_ind").val() == 1) {
        $("#calam_eruption_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_eruption_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_fire_ind").val() == 1) {
        $("#calam_fire_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_fire_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_fire_aid_ind").val() == 1) {
        $("#calam_fire_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_fire_aid_source").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_epidemic_ind").val() == 1) {
        $("#calam_epidemic_aid_ind").attr("hidden", false).required();
    } else {
        $("#calam_epidemic_aid_ind").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#calam_epidemic_aid_ind").val() == 1) {
        $("#calam_epidemic_aid_source").attr("hidden", false).required();
    } else {
        $("#calam_epidemic_aid_source").attr("hidden", "hidden").val("").notRequired();
    }

    if ($("#calam_typhoon_ind").val() == 1 || $("#calam_flood_ind").val() == 1 || $("#calam_drought_ind").val() == 1 || $("#calam_earthquake_ind").val() == 1 || $("#calam_eruption_ind").val() == 1 || $("#calam_fire_ind").val() == 1 || $("#calam_epidemic_ind").val() == 1) {

        $(".calam_evac_tr").attr("hidden", false);
        $("#calam_evac").required();
    } else {
        $(".calam_evac_tr").attr("hidden", "hidden");
        $("#calam_evac").val("").notRequired();
    }

    if ($("#dpkit_water_ind").val() == 1) {
        $("#dpkit_water_last").attr("hidden", false).required();
    } else {
        $("#dpkit_water_last").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#dpkit_food_ind").val() == 1) {
        $("#dpkit_food_last").attr("hidden", false).required();
    } else {
        $("#dpkit_food_last").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#crop_ind").val() == 1) {
        $("#crop_csh, #crop_knd").attr("hidden", false).required();
        $(".agricrop").show();
        $(".agri_inputs").required();
    } else {
        $("#crop_csh, #crop_knd").attr("hidden", "hidden").val("").notRequired();
        $(".agricrop").hide();
        $(".agri_inputs").val("").notRequired();
    }
    if ($("#live_ind").val() == 1) {
        $("#live_csh, #live_knd").attr("hidden", false).required();
    } else {
        $("#live_csh, #live_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#fish_ind").val() == 1) {
        $("#fish_csh, #fish_knd").attr("hidden", false).required();
    } else {
        $("#fish_csh, #fish_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#hunt_ind").val() == 1) {
        $("#hunt_csh, #hunt_knd").attr("hidden", false).required();
    } else {
        $("#hunt_csh, #hunt_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#sale_ind").val() == 1) {
        $("#sale_csh, #sale_knd").attr("hidden", false).required();
    } else {
        $("#sale_csh, #sale_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#manu_ind").val() == 1) {
        $("#manu_csh, #manu_knd").attr("hidden", false).required();
    } else {
        $("#manu_csh, #manu_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#social_ind").val() == 1) {
        $("#social_csh, #social_knd").attr("hidden", false).required();
    } else {
        $("#social_csh, #social_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#trans_ind").val() == 1) {
        $("#trans_csh, #trans_knd").attr("hidden", false).required();
    } else {
        $("#trans_csh, #trans_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#quar_ind").val() == 1) {
        $("#quar_csh, #quar_knd").attr("hidden", false).required();
    } else {
        $("#quar_csh, #quar_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#cons_ind").val() == 1) {
        $("#cons_csh, #cons_knd").attr("hidden", false).required();
    } else {
        $("#cons_csh, #cons_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#oea_ind").val() == 1) {
        $("#oea_csh, #oea_knd").attr("hidden", false).required();
    } else {
        $("#oea_csh, #oea_knd").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#agri_own_id").val() == 9) {
        $(".agri_own_o_tr").show();
        $("#agri_own_o").attr("hidden", false).required();
    } else {
        $(".agri_own_o_tr").hide();
        $("#agri_own_o").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_slp_ind").val() == 1) {
        $("#prog_slp_impl").attr("hidden", false).required();
    } else {
        $("#prog_slp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_ffp_ind").val() == 1) {
        $("#prog_ffp_impl").attr("hidden", false).required();
    } else {
        $("#prog_ffp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_cfw_ind").val() == 1) {
        $("#prog_cfw_impl").attr("hidden", false).required();
    } else {
        $("#prog_cfw_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_sp_ind").val() == 1) {
        $("#prog_sp_impl").attr("hidden", false).required();
    } else {
        $("#prog_sp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_pppp_ind").val() == 1) {
        $("#prog_pppp_impl").attr("hidden", false).required();
    } else {
        $("#prog_pppp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_arcdp_ind").val() == 1) {
        $("#prog_arcdp_impl").attr("hidden", false).required();
    } else {
        $("#prog_arcdp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_twsp_ind").val() == 1) {
        $("#prog_twsp_impl").attr("hidden", false).required();
    } else {
        $("#prog_twsp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_cbep_ind").val() == 1) {
        $("#prog_cbep_impl").attr("hidden", false).required();
    } else {
        $("#prog_cbep_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_hci_ind").val() == 1) {
        $("#prog_hci_impl").attr("hidden", false).required();
    } else {
        $("#prog_hci_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_gadp_ind").val() == 1) {
        $("#prog_gadp_impl").attr("hidden", false).required();
    } else {
        $("#prog_gadp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_hcap_ind").val() == 1) {
        $("#prog_hcap_name, #prog_hcap_impl").attr("hidden", false).required();
    } else {
        $("#prog_hcap_name, #prog_hcap_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_sfp_ind").val() == 1) {
        $("#prog_sfp_name, #prog_sfp_impl").attr("hidden", false).required();
    } else {
        $("#prog_sfp_name, #prog_sfp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_easp_ind").val() == 1) {
        $("#prog_easp_name, #prog_easp_impl").attr("hidden", false).required();
    } else {
        $("#prog_easp_name, #prog_easp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_sltp_ind").val() == 1) {
        $("#prog_sltp_name, #prog_sltp_impl").attr("hidden", false).required();
    } else {
        $("#prog_sltp_name, #prog_sltp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_clp_ind").val() == 1) {
        $("#prog_clp_name, #prog_clp_impl").attr("hidden", false).required();
    } else {
        $("#prog_clp_name, #prog_clp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_hp_ind").val() == 1) {
        $("#prog_hp_name, #prog_hp_impl").attr("hidden", false).required();
    } else {
        $("#prog_hp_name, #prog_hp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_lgg_ind").val() == 1) {
        $("#prog_lgg_name, #prog_lgg_impl").attr("hidden", false).required();
    } else {
        $("#prog_lgg_name, #prog_lgg_impl").attr("hidden", "hidden").val("").notRequired();
    }
    if ($("#prog_lcgp_ind").val() == 1) {
        $("#prog_lcgp_name, #prog_lcgp_impl").attr("hidden", false).required();
    } else {
        $("#prog_lcgp_name, #prog_lcgp_impl").attr("hidden", "hidden").val("").notRequired();
    }
    //#endregion
    // Loop through form input elements to check if there are required field without values
    for (let i = 0; i < addNewForm.length; i++) {
        thisElement = addNewForm[i];
        if (thisElement.value == "" && thisElement.getAttribute('required') == 'required') {
            requiredFieldsCount++;
            req(thisElement.id);
            if (!$("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
            }
        } else if (thisElement.value != "" && thisElement.getAttribute('required') == 'required') {
            if ($("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
                $("#" + thisElement.id).toggleClass("border-success");
            } else if (!$("#" + thisElement.id).hasClass("border-success")) {
                $("#" + thisElement.id).toggleClass("border-success");
            }
        } else if (thisElement.getAttribute('disabled')) {
            if ($("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
            }
        }
    }
    //#region another bunch of ifs
    if (numfam < 1) {
        req('numfam');
        requiredFieldsCount++;
        if (!$("#numfam").hasClass("border-danger")) {
            $("#numfam").toggleClass("border-danger");
        }
    } else {
        if (numfam != fams) {
            req('numfam');
            requiredFieldsCount++;
            if (!$("#numfam").hasClass("border-danger")) {
                $("#numfam").toggleClass("border-danger");
            }
        } else {
            if ($("#numfam").hasClass("border-danger")) {
                $("#numfam").toggleClass("border-danger");
            }
        }
    }
    if (numofw != ofws || $("#numofw").val() == "") {
        req('numofw');
        requiredFieldsCount++;
        if (!$("#numofw").hasClass("border-danger")) {
            $("#numofw").toggleClass("border-danger");
        }
    } else {
        if ($("#numofw").hasClass("border-danger")) {
            $("#numofw").toggleClass("border-danger");
        }
    }
    if (numpreg != pregnants || $("#numpreg").val() == "") {
        req('numpreg');
        requiredFieldsCount++;
        if (!$("#numpreg").hasClass("border-danger")) {
            $("#numpreg").toggleClass("border-danger");
        }
    } else {
        if ($("#numpreg").hasClass("border-danger")) {
            $("#numpreg").toggleClass("border-danger");
        }
    }
    if (numunipar != unipars || $("#numunipar").val() == "") {
        req('numunipar');
        requiredFieldsCount++;
        if (!$("#numunipar").hasClass("border-danger")) {
            $("#numunipar").toggleClass("border-danger");
        }
    } else {
        if ($("#numunipar").hasClass("border-danger")) {
            $("#numunipar").toggleClass("border-danger");
        }
    }
    if (numpwd != pwds || $("#numpwd").val() == "") {
        req('numpwd');
        requiredFieldsCount++;
        if (!$("#numpwd").hasClass("border-danger")) {
            $("#numpwd").toggleClass("border-danger");
        }
    } else {
        if ($("#numpwd").hasClass("border-danger")) {
            $("#numpwd").toggleClass("border-danger");
        }
    }

    if ($("#phsize").val() == "" || $("#phsize").val() == 0) {
        if (!$("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").hide();
    } else if (phsize > hpq_mem_length) {
        if (!$("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").show();
    } else {
        if ($("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").hide();
    }

    if (mdead != hpq_death_length) {
        req('mdead');
        requiredFieldsCount++;
        if (!$("#mdead").hasClass("border-danger")) {
            $("#mdead").toggleClass("border-danger");
        }
        $("#adddeceased_btn").show();
    } else {
        if ($("#mdead").hasClass("border-danger")) {
            $("#mdead").toggleClass("border-danger");
        }
        $("#adddeceased_btn").hide();
    }
    if (!updateFields()) {
        req('hcn');
        requiredFieldsCount++;
        if (!$("#hcn").hasClass("border-danger")) {
            $("#hcn").toggleClass("border-danger");
        }
    } else {
        if ($("#hcn").hasClass("border-danger")) {
            $("#hcn").toggleClass("border-danger");
        }
    }
    //#endregion
    if (requiredFieldsCount > 0) {

        $("#hpq_stat").val("0");

        $(".required-field").show();
        $("#requiredField").text(requiredFieldsCount);

    } else if (requiredFieldsCount < 1) {

        if (accessLevel != 1) {
            $("#hpq_stat").val("1");
        }

        $(".required-field").hide();

    }

}
function computeIncome() { // ok

    let crop_csh, live_csh, fish_csh, hunt_csh, sale_csh, manu_csh, social_csh, trans_csh, quar_csh, cons_csh, oea_csh, totea_csh, totwage_csh;
    let crop_knd, live_knd, fish_knd, hunt_knd, sale_knd, manu_knd, social_knd, trans_knd, quar_knd, cons_knd, oea_knd, totea_knd, totwage_knd;
    let ags_csh, ofw_csh, supf_csh, supr_csh, rent_csh, intr_csh, pen_csh, div_csh, oth_csh, etot_csh
    let ags_knd, ofw_knd, supf_knd, supr_knd, rent_knd, intr_knd, pen_knd, div_knd, oth_knd, etot_knd
    let imprnt, imprnttot, totin_csh, totin_knd, totin;

    crop_csh = +$("#crop_csh").val();
    live_csh = +$("#live_csh").val();
    fish_csh = +$("#fish_csh").val();
    hunt_csh = +$("#hunt_csh").val();
    sale_csh = +$("#sale_csh").val();
    manu_csh = +$("#manu_csh").val();
    social_csh = +$("#social_csh").val();
    trans_csh = +$("#trans_csh").val();
    quar_csh = +$("#quar_csh").val();
    cons_csh = +$("#cons_csh").val();
    oea_csh = +$("#oea_csh").val();
    totea_csh = (crop_csh + live_csh + fish_csh + hunt_csh + sale_csh + manu_csh + social_csh + trans_csh + quar_csh + cons_csh + oea_csh);
    $("#totea_csh").val(+totea_csh);

    crop_knd = +$("#crop_knd").val();
    live_knd = +$("#live_knd").val();
    fish_knd = +$("#fish_knd").val();
    hunt_knd = +$("#hunt_knd").val();
    sale_knd = +$("#sale_knd").val();
    manu_knd = +$("#manu_knd").val();
    social_knd = +$("#social_knd").val();
    trans_knd = +$("#trans_knd").val();
    quar_knd = +$("#quar_knd").val();
    cons_knd = +$("#cons_knd").val();
    oea_knd = +$("#oea_knd").val();
    totea_knd = (crop_knd + live_knd + fish_knd + hunt_knd + sale_knd + manu_knd + social_knd + trans_knd + quar_knd + cons_knd + oea_knd);
    $("#totea_knd").val(+totea_knd);

    ags_csh = +$("#ags_csh").val();
    ofw_csh = +$("#ofw_csh").val();
    supf_csh = +$("#supf_csh").val();
    supr_csh = +$("#supr_csh").val();
    rent_csh = +$("#rent_csh").val();
    intr_csh = +$("#intr_csh").val();
    pen_csh = +$("#pen_csh").val();
    div_csh = +$("#div_csh").val();
    oth_csh = +$("#oth_csh").val();
    etot_csh = (ags_csh + ofw_csh + supf_csh + supr_csh + rent_csh + intr_csh + pen_csh + div_csh + oth_csh);
    $("#etot_csh").val(+etot_csh);

    ags_knd = +$("#ags_knd").val();
    ofw_knd = +$("#ofw_knd").val();
    supf_knd = +$("#supf_knd").val();
    supr_knd = +$("#supr_knd").val();
    rent_knd = +$("#rent_knd").val();
    intr_knd = +$("#intr_knd").val();
    pen_knd = +$("#pen_knd").val();
    div_knd = +$("#div_knd").val();
    oth_knd = +$("#oth_knd").val();
    etot_knd = (ags_knd + ofw_knd + supf_knd + supr_knd + rent_knd + intr_knd + pen_knd + div_knd + oth_knd);
    $("#etot_knd").val(+etot_knd);

    imprnt = +$("#imprnt").val();
    imprnttot = imprnt * 12;
    $("#imprnttot").val(imprnttot);
    totin_csh = (totea_csh + etot_csh);
    totin_knd = (totea_knd + etot_knd);
    totin = (totin_csh + totin_knd + imprnttot);
    $("#totin_csh").val(totin_csh);
    $("#totin_knd").val(totin_knd);
    $("#totin").val(totin);

}
function checkforduplicate(brgy, hcn, fn) {

    for (let key in instancelist["data"]) {

        var ibrgy = instancelist["data"][key]["formDetail"]["brgy"];
        var ihcn = instancelist["data"][key]["formDetail"]["hcn"];
        var ifn = instancelist["data"][key]["instanceID"];

        if (ibrgy == brgy && ihcn == hcn && ifn == fn) {
            return true;
        } else if (ibrgy == brgy && ihcn == hcn && ifn != fn) {
            return false;
        }

    }
    return true;
}
function updateFields() {

    var regn = $("#regn").val();
    var prov = $("#prov").val();
    var mun = $("#mun").val();
    var brgy = $("#brgy").val();
    var hcn = $("#hcn").val();
    file_name = $("#filename").val();

    $("#hpq_id").val(regn + prov + mun + brgy + hcn);

    if (accessLevel != "1") {
        $("#encoder").val(userID);
    }

    if (checkforduplicate(brgy, hcn, file_name)) {
        if ($("#hcn").hasClass("is-invalid")) {
            $("#hcn").toggleClass("is-invalid");
        }
        return true;
    } else {
        Swal.fire({
            title: 'Oops!!!',
            text: 'Household Control Number already in use.',
            icon: 'error',
            timer: 5000
        }).then(() => {
            $("#hcn").val(null);
        })
        return false;
    }

}
function req(id) {
    $("#reqFields").append('<li><a class="dropdown-item my-0 py-0 reqFields" onclick="getme(this.rel);" rel="' + id + '" href="#' + id + '">' + id + '</a></li>');
}
function getme(me) {
    const pages_nav_li = document.getElementById("pages_nav").children;
    const tab_pane_id = $(`#${me}`).closest(".tab-pane").attr("id")
    var el;

    for (let i = 0; i < pages_nav_li.length; i++) {
        if (pages_nav_li[i].children[0].rel == tab_pane_id) {
            el = pages_nav_li[i].children[0];
            el.click();
        }
    }
}
//#endregion
//#region saving and managing HPQs
function add_hpq() {


    $("#header").html(topbar_hpq);
    $("#page").html(main_hpq);
    $("#sidebar").html(sidebar_hpq);

    $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
        $('body').toggleClass('toggle-sidebar')
        console.log("toggle");
    })

    pages_nav_li = document.getElementById("pages_nav").children;

    $("#next").click(function () {
        for (let i = 0; i < pages_nav_li.length; i++) {
            if (pages_nav_li[i].children[0].classList.contains("active")) {
                pages_nav_li[i].nextElementSibling.children[0].click();
                if (i == (pages_nav_li.length - 2)) {
                    $("#next").attr("disabled", "disabled");
                }
                $("#prev").removeAttr("disabled");
                break;
            }
        }
    })
    $("#prev").click(function () {
        for (let i = 0; i < pages_nav_li.length; i++) {
            if (pages_nav_li[i].children[0].classList.contains("active")) {
                pages_nav_li[i].previousElementSibling.children[0].click();
                if (i == 1) {
                    $("#prev").attr("disabled", "disabled");
                }
                $("#next").removeAttr("disabled");
                break;
            }
        }
    })
    $("#pages_nav li").on("click", function () {
        let li_index = $(this).index();
        if (li_index == 0) {
            $("#prev").attr("disabled", "disabled");
        } else {
            $("#prev").removeAttr("disabled");
        }
        if (li_index == 8) {
            $("#next").attr("disabled", "disabled");
        } else {
            $("#next").removeAttr("disabled");
        }
    })
    $("#fname").on("change", function () {
        var st = $(this).val();
        $(".dfname").html(st);
    });

    $("#sidebar").removeAttr("hidden");

    hpq_main = {};
    hpq_mem = [];
    hpq_death = [];
    hpq_prog = [];

    setTimeout(() => {

        document.getElementById('int_date').valueAsDate = new Date();
        $("#built_when").val(dateToday.getFullYear());
        $("#filename").val(-dateToday.getTime());
        $("#encoder").val(userID);

        $("#brgy").val(userDetails["brgy"]);

        if (accessLevel == "1") $(".forAdmin").show();
        else $(".forAdmin").hide();

        $(":input").on("change", function () {
            validate_main_form();
        });

        autoSaveInterval = setInterval(() => {
            autoSave();
        }, 60000);

        validate_main_form();
        geolocationCoordinates();

    }, 250);
}
function addhpq() {

    $(".hpq_page").removeAttr("hidden");
    $(".dashboard_page").attr("hidden", true);
    $("body").toggleClass("toggle-sidebar");

    hpq_main = {};
    hpq_mem = [];
    hpq_death = [];
    hpq_prog = [];

    //Android.loadHPQForm();

    setTimeout(() => {

        document.getElementById('int_date').valueAsDate = new Date();
        $("#built_when").val(dateToday.getFullYear());
        $("#filename").val(-dateToday.getTime());
        $("#encoder").val(userID);

        $("#brgy").val(userDetails["brgy"]);

        if (accessLevel == "1") $(".forAdmin").show();
        else $(".forAdmin").hide();

        $(":input").on("change", function () {
            validate_main_form();
        });

        setInterval(() => {
            autoSave();
        }, 60000);

        validate_main_form();
        geolocationCoordinates();

    }, 250);

}
function autoSave() { /***/

    var brgy = $("#brgy").val();
    var hcn = $("#hcn").val();
    exitMode = "";

    hpq_main = $("#addnew_form").serializeJSON();

    hpq_main["hpq_mem"] = JSON.parse(Android.getTemp("hpq_mem"));
    hpq_main["hpq_death"] = JSON.parse(Android.getTemp("hpq_death"));
    hpq_main["hpq_prog"] = JSON.parse(Android.getTemp("hpq_prog"));

    if (brgy != "" && hcn != "") {
        Android.autoSaveHPQ(JSON.stringify(hpq_main))
    }

}
function saveData(mode) { // ok

    var brgy = $("#brgy").val();
    var hcn = $("#hcn").val();
    exitMode = mode;

    hpq_main = $("#addnew_form").serializeJSON();

    hpq_main["hpq_mem"] = JSON.parse(Android.getTemp("hpq_mem"));
    hpq_main["hpq_death"] = JSON.parse(Android.getTemp("hpq_death"));
    hpq_main["hpq_prog"] = JSON.parse(Android.getTemp("hpq_prog"));

    if (hpq_edit_Mode == 1) {
        if (brgy != "" && hcn != "") {
            Android.saveHPQ(JSON.stringify(hpq_main))
            Android.clearTemp();
        } else {
            Swal.fire({
                title: 'Required fields empty!',
                html: 'Please select <b>Barangay</b> and <b>HCN</b> before pre-saving.',
                icon: 'error',
                timer: 3000
            })
        }

    }

}
function saveResponse(code) {

    if (exitMode == "save" || exitMode == "exit") {
        switch (code) {
            case 0:
                Swal.fire({
                    title: 'Saved!',
                    html: `File ${hpq_main["filename"]} successfuly saved.`,
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                }).then(function () {
                    hpq_main = null;
                    hpq_mem = null;
                    hpq_death = null;
                    hpq_prog = null;
                    if (exitMode == "exit" || requiredFieldsCount < 1) {
                        home();
                    }
                })
                break;
            case 1:
                Swal.fire({
                    title: 'Oops!!! Something went wrong :(',
                    html: 'File could not be saved!<br><br>Please check your storage permission.',
                    icon: 'error',
                })
                break;
            case 2:
                Swal.fire({
                    title: 'Auto save failed!',
                    html: 'Please check your storage permission.',
                    icon: 'error',
                })
                break;
        }
    }
}
function edit_hpq(file_name) {

    hpq_data = JSON.parse(Android.openHPQ(file_name));

    if (hpq_data == "file_not_found") {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'File not found!',
            icon: 'error',
            timer: 3000
        })
    } else {

        $("#header").html(topbar_hpq);
        $("#page").html(main_hpq);
        $("#sidebar").html(sidebar_hpq);

        $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
            $('body').toggleClass('toggle-sidebar')
        })

        pages_nav_li = document.getElementById("pages_nav").children;

        $("#next").click(function () {
            for (let i = 0; i < pages_nav_li.length; i++) {
                if (pages_nav_li[i].children[0].classList.contains("active")) {
                    pages_nav_li[i].nextElementSibling.children[0].click();
                    if (i == (pages_nav_li.length - 2)) {
                        $("#next").attr("disabled", "disabled");
                    }
                    $("#prev").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#prev").click(function () {
            for (let i = 0; i < pages_nav_li.length; i++) {
                if (pages_nav_li[i].children[0].classList.contains("active")) {
                    pages_nav_li[i].previousElementSibling.children[0].click();
                    if (i == 1) {
                        $("#prev").attr("disabled", "disabled");
                    }
                    $("#next").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#pages_nav li").on("click", function () {
            let li_index = $(this).index();
            if (li_index == 0) {
                $("#prev").attr("disabled", "disabled");
            } else {
                $("#prev").removeAttr("disabled");
            }
            if (li_index == 8) {
                $("#next").attr("disabled", "disabled");
            } else {
                $("#next").removeAttr("disabled");
            }
        })
        $("#fname").on("change", function () {
            var st = $(this).val();
            $(".dfname").html(st);
        });

        $("#sidebar").removeAttr("hidden");

        hpq_edit_Mode = 1;

        Android.setTemp("hpq_mem", JSON.stringify(hpq_data["hpq_mem"]));
        Android.setTemp("hpq_death", JSON.stringify(hpq_data["hpq_death"]));
        Android.setTemp("hpq_prog", JSON.stringify(hpq_data["hpq_prog"]));

        hpq_mem = JSON.parse(Android.getTemp("hpq_mem"));
        hpq_death = JSON.parse(Android.getTemp("hpq_death"));
        hpq_prog = JSON.parse(Android.getTemp("hpq_prog"));

        setTimeout(() => {

            for (let prop in hpq_data) {
                $("#" + prop).val(hpq_data[prop]);
            }

            if (accessLevel == "1") {
                $(".forAdmin").show();
            } else {
                $(".forAdmin").hide();
            }

            get_members(hpq_mem);
            get_deceased(hpq_death);
            get_prog(hpq_prog);

            setTimeout(() => {
                $(":input").on("change", function () {
                    validate_main_form();
                }).on("focusout", function () {
                    validate_main_form();
                });
                autoSaveInterval = setInterval(() => {
                    autoSave();
                }, 60000);
                validate_main_form();
                hpq_data = null;
            }, 500);
        }, 500);
    }

}
function view_hpq(file_name) {

    hpq_data = JSON.parse(Android.openHPQ(file_name));

    if (Android.openHPQ(file_name) == "file_not_found") {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'File not found.',
            icon: 'error',
            timer: 3000
        })
    } else {

        $("#header").html(topbar_hpq);
        $("#page").html(main_hpq);
        $("#sidebar").html(sidebar_hpq);

        $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
            $('body').toggleClass('toggle-sidebar')
            console.log("toggle");
        })

        pages_nav_li = document.getElementById("pages_nav").children;

        $("#next").click(function () {
            for (let i = 0; i < pages_nav_li.length; i++) {
                if (pages_nav_li[i].children[0].classList.contains("active")) {
                    pages_nav_li[i].nextElementSibling.children[0].click();
                    if (i == (pages_nav_li.length - 2)) {
                        $("#next").attr("disabled", "disabled");
                    }
                    $("#prev").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#prev").click(function () {
            for (let i = 0; i < pages_nav_li.length; i++) {
                if (pages_nav_li[i].children[0].classList.contains("active")) {
                    pages_nav_li[i].previousElementSibling.children[0].click();
                    if (i == 1) {
                        $("#prev").attr("disabled", "disabled");
                    }
                    $("#next").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#pages_nav li").on("click", function () {
            let li_index = $(this).index();
            if (li_index == 0) {
                $("#prev").attr("disabled", "disabled");
            } else {
                $("#prev").removeAttr("disabled");
            }
            if (li_index == 8) {
                $("#next").attr("disabled", "disabled");
            } else {
                $("#next").removeAttr("disabled");
            }
        })
        $("#fname").on("change", function () {
            var st = $(this).val();
            $(".dfname").html(st);
        });

        $("#sidebar").removeAttr("hidden");

        hpq_edit_Mode = 2;

        hpq_mem = hpq_data["hpq_mem"];
        hpq_death = hpq_data["hpq_death"];
        hpq_prog = hpq_data["hpq_prog"];

        Android.setTemp("hpq_mem", JSON.stringify(hpq_mem));
        Android.setTemp("hpq_death", JSON.stringify(hpq_death));
        Android.setTemp("hpq_prog", JSON.stringify(hpq_prog));

        setTimeout(() => {

            for (let prop in hpq_data) {
                $("#addnew_form").find("#" + prop).val(hpq_data[prop]);
            }

            if (accessLevel == "1") {
                $(".forAdmin").show();
            } else {
                $(".forAdmin").hide();
            }

            get_members(hpq_mem);
            get_deceased(hpq_death);
            get_prog(hpq_prog);

            setTimeout(() => {
                hpq_data = null;
            }, 500);
        }, 500);
    }

}
function delete_hpq(file_name) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            if (Android.deleteHPQ(file_name)) {
                Swal.fire({
                    title: 'Deleted',
                    html: 'File has been deleted.',
                    icon: 'success',
                })
                recoverInstancelist();
            } else {
                Swal.fire({
                    title: 'Oops!!! Something went wrong :(',
                    html: 'File could not be deleted.<br><br>Please check your storage permission.',
                    icon: 'error',
                })
            }
        }
    })

}
function upload_hpq() {

    var len = 0;
    try {
        instances_to_upload = $("#instancelist_form").serializeJSON();
        len = instances_to_upload["instances"].length;
        if (len > 0) {
            $("#upload-modal").modal("show");
            $("#upload-modal").find("#upload-title").html("<b>Connecting</b>");
            $("#upload-modal").find("#upload-message").html("Establishing connection to server...");
            Android.openConnection();
        }
    } catch (error) {
        Swal.fire({
            title: 'No file selected',
            html: 'Please select atleast one <b>Validated</b> HPQ to upload.',
            icon: 'info',
        })
    }

}
function serverResponse(response) {

    let resData = JSON.parse(response);

    switch (resData["data"]) {
        case "server_online":
            $("#upload-modal").find("#upload-title").html("<b>Uploading</b>");
            $("#upload-modal").find("#upload-message").html("Uploading HPQ(s)...");
            Android.uploadHPQ(JSON.stringify(instances_to_upload));
            break;
        default:
            Swal.fire({
                title: 'Server unreachable.',
                html: 'Please check your internet connection.',
                icon: 'error',
            })
            $("#upload-modal").modal("hide");
            document.getElementById("instancelist_form").reset();
            break;
    }

    //"﻿{"error":false,"data":"server_online"}"
    //﻿{"error":false,"data":"server_online"}"

}
function uploadResponse(response) {

    let resData = JSON.parse(response);

    if (resData["data"] == "all_files_uploaded") {
        setTimeout(() => {
            document.getElementById("instancelist_form").reset();
        }, 2000);
    } else {
        if (resData["error"]) {
            $("#upload-modal").find("#upload-message").append(resData["data"]);
        } else {
            $("#upload-modal").find("#upload-message").append(`<br>Uploaded: ${resData["data"]}`);
        }
    }

}
//#endregion manage HPQs
//#region add household members section
function validated_add_mem_form() { // ok

    let age;

    let today = new Date();
    let bday = new Date($("#birthdate").val());
    age = today.getFullYear() - bday.getFullYear();
    let m = today.getMonth() - bday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
        age--;
    }

    $("#age").val(age);

    if ($("#nucfam").val() != 1) {
        $("#reln option[value='1']").prop("hidden", true);
        $("#reln option[value='2']").prop("hidden", true);
    } else {
        if (hh_head_disabled) {
            $("#reln option[value='1']").prop("hidden", true);
        } else {
            $("#reln option[value='1']").prop("hidden", false);
        }
        if (hh_spouse_disabled) {
            $("#reln option[value='2']").prop("hidden", true);
        } else {
            $("#reln option[value='2']").prop("hidden", false);
        }
    }
    if (xf_head_disabled) {
        $("#reln2 option[value='1']").prop("hidden", true);
    } else {
        $("#reln2 option[value='1']").prop("hidden", false);
    }
    if (xf_spouse_disabled) {
        $("#reln2 option[value='2']").prop("hidden", true);
    } else {
        $("#reln2 option[value='2']").prop("hidden", false);
    }

    //#region bunch of ifs
    if (age >= 3) {
        if (numofw < 1) {
            $(".mlenres_tr").show();
            $("#mlenres").required();
        }
        $(".civstat, .educ").show();
        $("#civstat, #educind, #educal").required();
    } else {
        $(".mlenres_tr").hide();
        $("#mlenres").notRequired();
        $(".civstat, .educ").hide();
        $("#civstat, #educind, #educal").val("").notRequired();
        $(".educ_inputs").val("").notRequired();
    }
    if (age >= 5) {
        $(".literacy, .job").show();
        $("#literind, #jobind").required();
    } else {
        $(".literacy, .job").hide();
        $("#literind, #jobind").val("").notRequired();
    }
    if (age >= 10) {
        $(".gender, .gender_t").show();
        $("#gender, #gender_t").required();
    } else {
        $(".gender, .gender_t").hide();
        $("#gender, #gender_t").val("").notRequired();
    }
    if ((age >= 10 && numofw > 0 && numofw != ofws) || (age >= 10 && numofw > 0 && mem_is_ofw)) {
        $(".ofwind_tr").show();
        $("#ofwind").required();
    } else {
        $(".ofw, .ofwind_tr").hide();
        $("#ofwind").val("").notRequired();
        $(".ofw_inputs").val("").notRequired();
    }
    if ((age >= 10 && numunipar > 0 && numunipar != unipars) || (age >= 10 && numunipar > 0 && mem_is_unipar)) {
        $(".soloparent").show();
        $("#uniparind").required();
    } else {
        $(".soloparent").hide();
        $("#uniparind").val("").notRequired();
        $(".sp_inputs").val("").notRequired();
    }
    if (age >= 60) {
        $(".seniorcitizen").show();
        $("#scid").required();
    } else {
        $(".seniorcitizen").hide();
        $("#scid").val("").notRequired();
    }
    if ((age >= 12 && $("#sex").val() == 2 && numpreg > 0 && numpreg != pregnants) || (age >= 12 && $("#sex").val() == 2 && numpreg > 0 && mem_is_pregnant)) {
        $(".sdg").show();
        $(".rcs_inputs").required();
    } else {
        $(".sdg").hide();
        $(".sdg_inputs").val("").notRequired();
    }
    if ($("#reln").val() == 13) {
        $(".reln_o_tr").show();
        $("#reln_o").required();
    } else {
        $(".reln_o_tr").hide();
        $("#reln_o").val("").notRequired();
    }
    if ($("#nucfam").val() > 1) {
        $(".reln2_tr").show();
        $("#reln2").required();
    } else {
        $(".reln2_tr").hide();
        $("#reln2").val("").notRequired();
    }
    if ($("#reln2").val() == 13) {
        $(".reln2_o_tr").show();
        $("#reln2_o").required();
    } else {
        $(".reln2_o_tr").hide();
        $("#reln2_o").val("").notRequired();
    }
    if ($("#civstat").val() == 2 || $("#civstat").val() == 5) {
        $(".familyplanning").show();
        $("#famplanind").required();
    } else /**if ($("#civstat").val() != 2 || $("#civstat").val() != 5)*/ {
        $(".familyplanning").hide();
        $("#famplanind").val("").notRequired();
        $(".fp_inputs").val("").notRequired();
    }
    if ($("#religion").val() == 7) {
        $(".religion_o").show();
        $("#religion_o").required();
    } else {
        $(".religion_o").hide();
        $("#religion_o").val("").notRequired();
    }
    if ($("#gender").val() == 1) {
        $(".gender_t").show();
        $("#gender_t").required();
    } else {
        $(".gender_t").hide();
        $("#gender_t").val("").notRequired();
    }
    if ($("#ethgrp").val() == 25) {
        $(".ethgrp_o").show();
        $("#ethgrp_o").required();
    } else {
        $(".ethgrp_o").hide();
        $("#ethgrp_o").val("").notRequired();
    }
    if ($("#ofwind").val() == 1) {
        $(".ofw").slideDown();
        $(".ofw_inputs").required();

        $(".mlenres_tr, .mlenres_o_tr").hide();
        $("#mlenres, #mlenres_o").val("").notRequired();
    } else /**if ($("#ofwind").val() == 2)*/ {
        $(".ofw").hide();
        $(".ofw_inputs").val("").notRequired();
        if (age >= 3) {
            $(".mlenres_tr").show();
            $("#mlenres").required();
        }
    }
    if ($("#mlenres").val() == 2) {
        $(".mlenres_o_tr").show();
        $("#mlenres_o").required();
    } else {
        $(".mlenres_o_tr").hide();
        $("#mlenres_o").val("").notRequired();
    }
    if ($("#ofw_reason_leave").val() == 7) {
        $(".ofw_reason_leave_o_tr").show();
        $("#ofw_reason_leave_o").required();
    } else {
        $(".ofw_reason_leave_o_tr").hide();
        $("#ofw_reason_leave_o").val("").notRequired();
    }
    if ($("#ofw_reason_return").val() == 5) {
        $(".ofw_reason_return_o_tr").show();
        $("#ofw_reason_return_o").required();
    } else {
        $(".ofw_reason_return_o_tr").hide();
        $("#ofw_reason_return_o").val("").notRequired();
    }
    if ($("#ofw_plans_return").val() == 5) {
        $(".ofw_plans_return_o_tr").show();
        $("#ofw_plans_return_o").required();
    } else {
        $(".ofw_plans_return_o_tr").hide();
        $("#ofw_plans_return_o").val("").notRequired();
    }
    if ($("#ofw_remit_spent").val() == 4) {
        $(".ofw_remit_spent_o_tr").show();
        $("#ofw_remit_spent_o").required();
    } else {
        $(".ofw_remit_spent_o_tr").hide();
        $("#ofw_remit_spent_o").val("").notRequired();
    }
    if ($("#ofw_services").val() == 5) {
        $(".ofw_services_o_tr").show();
        $("#ofw_services_o").required();
    } else {
        $(".ofw_services_o_tr").hide();
        $("#ofw_services_o").val("").notRequired();
    }
    if ($("#educind").val() == 1) {
        $(".gradel_tr, .schtype_tr").show();
        $("#gradel, #schtype").required();
    } else if ($("#educind").val() == 2) {
        $(".gradel_tr, .schtype_tr").hide();
        $("#gradel, #schtype").val("").notRequired();

        if (age <= 24) {
            $(".ynotsch_tr").show();
            $("#ynotsch").required();
        } else {
            $(".ynotsch_tr, .ynotsch_o_tr").hide();
            $("#ynotsch, #ynotsch_o_tr").val("").notRequired();
        }

    }
    if ($("#gradel").val() >= 23 && $("#gradel").val() <= 41) {
        $(".course_tr").show();
        $("#course").required();
    } else {
        $(".course_tr").hide();
        $("#course").val("").notRequired();
    }
    if ($("#ynotsch").val() == 15) {
        $(".ynotsch_o_tr").show();
        $("#ynotsch_o").required();
    } else {
        $(".ynotsch_o_tr").hide();
        $("#ynotsch_o").val("").notRequired();
    }
    if (($("#educal").val() >= 23 && $("#educal").val() <= 41) || ($("#educal").val() >= 210 && $("#educal").val() <= 400)) {
        $(".fcourse_tr").show();
        $("#fcourse").required();
    } else {
        $(".fcourse_tr").hide();
        $("#fcourse").val("").notRequired();
    }
    if ($("#literind").val() == 1) {
        $(".language_tr").show();
        $("#lang").required();
    } else {
        $(".language_tr, .language_o_tr").hide();
        $("#lang, #lang_o").val("").notRequired();
    }
    if ($("#lang").val() == 8) {
        $(".language_o_tr").show();
        $("#lang_o").required();
    } else {
        $(".language_o_tr").hide();
        $("#lang_o").val("").notRequired();
    }
    if ($("#jobind").val() == 1) {
        $(".occup_tr").show();
        $(".job_inputs").required();

        if (age >= 15) {
            $(".15up_tr").show();
            $(".job_inputs_15up").required();
        } else {
            $(".15up_tr").hide();
            $(".job_inputs_15up").val("").notRequired();
        }

    } else {
        $(".occup_tr").hide();
        $(".job_inputs, .job_inputs_15up").val("").notRequired();
        $(".15up_tr").hide();
    }
    if ($("#crime").val() == 1) {
        $(".crimetype_tr").show();
        $("#crimetype").required();
    } else {
        $(".crimetype_tr, .crimetype_o_tr").hide();
        $("#crimetype, #crimetype_o").val("").notRequired();
    }
    if ($("#crimetype").val() == 7) {
        $(".crimetype_o_tr").show();
        $("#crimetype_o").required();
    } else {
        $(".crimetype_o_tr").hide();
        $("#crimetype_o").val("").notRequired();
    }
    if ($("#healthcareprovider").val() == 8) {
        $(".healthcareprovider_o_tr").show();
        $("#healthcareprovider_o").required();
    } else {
        $(".healthcareprovider_o_tr").hide();
        $("#healthcareprovider_o").val("").notRequired();
    }
    if ($("#uniparind").val() == 1) {
        $(".uniparreason_tr").show();
        $("#uniparreason").required();
    } else {
        $(".uniparreason_tr, .uniparreason_o_tr").hide();
        $("#uniparreason, #uniparreason_o").val("").notRequired();
    }
    if ($("#uniparreason").val() == 10) {
        $(".uniparreason_o_tr").show();
        $("#uniparreason_o").required();
    } else {
        $(".uniparreason_o_tr").hide();
        $("#uniparreason_o").val("").notRequired();
    }
    if ((numpwd > 0 && numpwd != pwds) || (numpwd > 0 && mem_is_pwd)) {
        $(".pwd").show();
        $("#pwdind").required();
    } else {
        $(".pwd, .pwd_inputs_tr, .pwd_inputs_o_tr").hide();
        $(".pwdind, .pwd_inputs").val("").notRequired();
    }
    if ($("#pwdind").val() == 1) {
        $(".pwd_inputs_tr").show();
        $("#pwdtype, #pwdcause, #pwdid").required();
    } else {
        $(".pwd_inputs_tr, .pwd_inputs_o_tr").hide();
        $(".pwd_inputs").val("").notRequired();
    }
    if ($("#pwdtype").val() == 17) {
        $(".pwdtype_o_tr").show();
        $("#pwdtype_o").required();
    } else {
        $(".pwdtype_o_tr").hide();
        $("#pwdtype_o").val("").notRequired();
    }
    if ($("#pwdcause").val() == 5) {
        $(".pwdcause_o_tr").show();
        $("#pwdcause_o").required();
    } else {
        $(".pwdcause_o_tr").hide();
        $("#pwdcause_o").val("").notRequired();
    }
    if ($("#famplanind").val() == 1) {
        $(".fp_meth_tr, .fp_provider_tr").show();
        $("#fp_meth, #fp_provider").required();
    } else {
        $(".fp_meth_tr, .fp_meth_o_tr, .fp_provider_tr, .fp_provider_o_tr").hide();
        $(".fp_inputs").val("").notRequired();
    }
    if ($("#fp_meth").val() == 18) {
        $(".fp_meth_o_tr").show();
        $("#fp_meth_o").required();
    } else {
        $(".fp_meth_o_tr").hide();
        $("#fp_meth_o").val("").notRequired();
    }
    if ($("#fp_provider").val() == 6) {
        $(".fp_provider_o_tr").show();
        $("#fp_provider_o").required();
    } else {
        $(".fp_provider_o_tr").hide();
        $("#fp_provider_o").val("").notRequired();
    }
    if ($("#sdg_numchildborn").val() > 0) {
        $(".sdg_preg5years_tr").show();
        $("#sdg_preg5years").required();
    } else {
        $(".sdg_preg5years_tr").hide();
        $("#sdg_preg5years").val("").notRequired();
        $(".sdg_preg5years_tb").hide();
        $(".sdg_withchild").val("").notRequired();
    }
    if ($("#sdg_preg5years").val() == 1) {
        $(".sdg_preg5years_tb").show();
        $(".sdg_withchild").required();
    } else {
        $(".sdg_preg5years_tb").hide();
        $(".sdg_withchild").val("").notRequired();
    }
    if ($("#sdg_childdelivery").val() == 6) {
        $(".sdg_childdelivery_o_tr").show();
        $("#sdg_childdelivery_o").required();
    } else {
        $(".sdg_childdelivery_o_tr").hide();
        $("#sdg_childdelivery_o").val("").notRequired();
    }
    if ($("#sdg_deliverassist").val() == 7) {
        $(".sdg_deliverassist_o_tr").show();
        $("#sdg_deliverassist_o").required();
    } else {
        $(".sdg_deliverassist_o_tr").hide();
        $("#sdg_deliverassist_o").val("").notRequired();
    }
    //#endregion
}
function update_reln() {

    var head_count = 0, spouse_count = 0;
    hh_head_disabled = false;
    hh_spouse_disabled = false;

    $.each(hpq_mem, function (i, item) {

        if (item.nucfam == 1 && item.reln == 1) {
            head_count++;
        }
        if (item.nucfam == 1 && item.reln == 2) {
            spouse_count++;
        }

    });

    if (head_count > 0) { hh_head_disabled = true };
    if (spouse_count > 0) { hh_spouse_disabled = true };

}
function update_reln2() {

    var xf_head_count = 0, xf_spouse_count = 0;
    xf_head_disabled = false;
    xf_spouse_disabled = false;

    $.each(hpq_mem, function (i, item) {

        if (item.nucfam == $("#nucfam").val() && item.reln2 == 1) {
            xf_head_count++;
        }
        if (item.nucfam == $("#nucfam").val() && item.reln2 == 2) {
            xf_spouse_count++;
        }

    });

    if (xf_head_count > 0) { xf_head_disabled = true };
    if (xf_spouse_count > 0) { xf_spouse_disabled = true };

}
function add_mem() {

    mem_edit_Mode = false;

    $("#addmemModal").modal("show");

}
function edit_mem(mem_index_to_edit) {

    mem_edit_Mode = true;
    mem_index_edited = mem_index_to_edit;
    let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));

    $("#addmemModal").modal("show");

    $.each(hpq_mem_TEMP, function (i, item) {

        if (item.memindex == mem_index_to_edit) {
            for (let prop in item) {

                if (item.reln == 1) { hh_head_disabled = false };
                if (item.reln == 2) { hh_spouse_disabled = false };
                if (item.ofwind == 1) { mem_is_ofw = true } else { mem_is_ofw = false };
                if (item.uniparind == 1) { mem_is_unipar = true } else { mem_is_unipar = false };
                if (item.pwdind == 1) { mem_is_pwd = true } else { mem_is_pwd = false };
                if (item.sdg_pregind == 1) { mem_is_pregnant = true } else { mem_is_pregnant = false };

                $("#addmem_form").find("#" + prop).val(item[prop]);

            }
        }
    });
}
$("#addmemModal").on("show.bs.modal", function (e) {

    $("#addmem_form :input").on("change", function () {
        validated_add_mem_form();
        update_reln2();
    });

    nucfamchoices = null;

    for (let i = 1; i <= numfam; i++) {
        nucfamchoices += "<option value='" + i + "'>" + i + "</option>"
    }
    $("#nucfam").html(nucfamchoices);

    update_reln();

    if (hpq_edit_Mode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }
});
$("#addmem_form").on("submit", function (e) {
    e.preventDefault();

    let memData = $("#addmem_form").serializeJSON();
    let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));
    let memArr = [];

    $.each(hpq_mem, function (i, item) {
        memArr.push(item.memindex);
    });

    let mem_last_index = Math.max.apply(Math, memArr) + 1;

    if (hpq_mem_TEMP == null) {
        hpq_mem_TEMP = [];
        hpq_mem_TEMP_length = 0;
    } else {
        hpq_mem_TEMP_length = hpq_mem_TEMP.length;
    }

    if (mem_edit_Mode) {
        hpq_mem_TEMP.splice(mem_index_edited, 1, memData);
    } else {
        if (hpq_mem_TEMP_length < 1) {
            memData["memindex"] = 0;
        } else {
            memData["memindex"] = mem_last_index;
        }
        hpq_mem_TEMP.push(memData);
    }

    Android.setTemp("hpq_mem", JSON.stringify(hpq_mem_TEMP));
    hpq_mem = hpq_mem_TEMP;

    $("#addmemModal").modal("hide");
    document.getElementById("addmem_form").reset();

    get_members(hpq_mem);

});
$("#addmemModal").on("shown.bs.modal", function (e) {

    validated_add_mem_form();

    $("#addmem_form #fname").on("change", function () {
        var st = $(this).val();
        $(".dfname").html(st);
    });

});
$("#addmemModal").on("hidden.bs.modal", function (e) {
    $("#addmem_form :input").off();
    document.getElementById("addmem_form").reset();
});
function delete_mem(mem_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {

            let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));

            let remmem = hpq_mem_TEMP.filter(items => items.memindex != mem_index_to_delete);

            Android.setTemp("hpq_mem", JSON.stringify(remmem));
            hpq_mem = remmem;
            get_members(hpq_mem);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })

}
function get_members(memData) {

    let table_contents = [], nav_contents = [];
    $.each(memData, function (i, item) {
        table_contents.push('<tr>');
        table_contents.push('    <td>' + item.lname + ', ' + item.fname + ' ' + item.mname + '</td>');
        table_contents.push('    <td>' + _reln[item.reln] + '</td>');
        table_contents.push('    <td align="center">');
        if (hpq_edit_Mode == 2) {
            table_contents.push('    <a onclick="edit_mem(' + item.memindex + ')" class="btn btn-success mb-1 text-light">');
            table_contents.push('        <i class="bi bi-eye"></i>');
            table_contents.push('    </a>');
        } else {
            table_contents.push('    <a onclick="edit_mem(' + item.memindex + ')" class="btn btn-success mb-1 text-light">');
            table_contents.push('        <i class="bi bi-pencil"></i>');
            table_contents.push('    </a>');
            table_contents.push('    <a onclick="delete_mem(' + item.memindex + ')" class="btn btn-danger mb-1 text-light">');
            table_contents.push('        <i class="bi bi-trash"></i>');
            table_contents.push('    </a>');
        }
        table_contents.push('    </td>');
        table_contents.push('</tr>');
        nav_contents.push(' <li class="dropdown">')
        nav_contents.push('     <a class="nav-link collapsed" href="#" data-bs-toggle="dropdown"><i class="bi arrow-right"></i><span>' + item.lname + ', ' + item.fname + '<br><sup>' + _reln[item.reln] + '</sup></span></a>')
        nav_contents.push('     <ul class="dropdown-menu">')
        if (hpq_edit_Mode == 2) {
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-eye text-secondary me-2"></span>View');
            nav_contents.push('         </a>');
        } else {
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-eye text-secondary me-2"></span>View');
            nav_contents.push('         </a>');
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-pencil-square text-secondary me-2"></span>Edit');
            nav_contents.push('         </a>');
            nav_contents.push('         <a onclick="delete_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-trash text-secondary me-2"></span>Delete');
            nav_contents.push('         </a>');
        }
        nav_contents.push('     </ul>')
        nav_contents.push(' </li>')
    });

    $("#mem_table").html(table_contents.join("").toString());
    $("#members_nav").html(nav_contents.join("").toString());
}
//#endregion end of add household members section
//#region add deceased section
function add_deceased() {

    deceased_edit_Mode = false;

    $("#adddeceasedModal").modal("show");

}
$("#adddeceasedModal").on("show.bs.modal", function (e) {

    $("#causeofdeath").on("change", function () {
        if (this.val() == 13) {
            $(".causeofdeath_o_tr").show();
            $("#causeofdeath_o").required();
        } else {
            $(".causeofdeath_o_tr").hide();
            $("#causeofdeath_o").val("").notRequired();
        }
    });

    if (hpq_edit_Mode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#adddeceased_form").on("submit", function (e) {
    e.preventDefault();

    let deceasedData = $("#adddeceased_form").serializeJSON();
    let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));
    let deadArr = [];

    $.each(hpq_death, function (i, item) {

        deadArr.push(item.dindex);

    });

    let dead_last_index = Math.max.apply(Math, deadArr) + 1;

    if (hpq_death_TEMP == null) {
        hpq_death_TEMP = [];
        hpq_death_TEMP_length = 0
    } else {
        hpq_death_TEMP_length = hpq_death_TEMP.length;
    }

    if (deceased_edit_Mode) {
        hpq_death_TEMP.splice(deceased_index_edited, 1, deceasedData);
    } else {
        if (hpq_death_TEMP_length < 1) {
            deceasedData["dindex"] = 0;
        } else {
            deceasedData["dindex"] = dead_last_index;
        }
        hpq_death_TEMP.push(deceasedData);
    }

    Android.setTemp("hpq_death", JSON.stringify(hpq_death_TEMP));

    $("#adddeceasedModal").modal("hide");
    document.getElementById("adddeceased_form").reset();

    hpq_death = hpq_death_TEMP;

    get_deceased(hpq_death);

});
$("#adddeceasedModal").on("shown.bs.modal", function (e) {

    validate_add_deceased_form();

});
$("#adddeceasedModal").on("hidden.bs.modal", function (e) {
    $("#causeofdeath").off();
    document.getElementById("adddeceased_form").reset();
});
function edit_deceased(dead_index_to_edit) {

    deceased_edit_Mode = true;
    deceased_index_edited = dead_index_to_edit;
    let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));

    $("#adddeceasedModal").modal("show");

    $.each(hpq_death_TEMP, function (i, deadRow) {

        if (deadRow.dindex == dead_index_to_edit) {
            for (let key in deadRow) {

                $("#adddeceased_form").find("#" + key).val(deadRow[key]);

            }
        }
    });
}
function delete_deceased(dead_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));

            var remdeceased = hpq_death_TEMP.filter(items => items.dindex != dead_index_to_delete);

            Android.setTemp("hpq_death", JSON.stringify(remdeceased));

            hpq_death = remdeceased;

            get_deceased(hpq_death);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_deceased(deceasedData) {

    let c = [];
    $.each(deceasedData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.dlname + ', ' + item.dfname + ' ' + item.dmname + '</td>');
        c.push('    <td>' + _sex[item.dsex] + '</td>');
        c.push('    <td align="center">');
        if (hpq_edit_Mode == 2) {
            c.push('    <a onclick="edit_deceased(' + item.dindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_deceased(' + item.dindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_deceased(' + item.dindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#death_table").html(c.join("").toString());
}
//#endregion end of add deceased section
//#region add program section
function add_prog() {

    prog_edit_Mode = false;

    $("#addprogModal").modal("show");

}
$("#addprogModal").on("show.bs.modal", function (e) {

    get_refs(JSON.parse(Android.getTemp("hpq_mem")));

    $("#prog_type").on("change", function () {
        if ($("#prog_type").val() == 19) {
            $("#prog_type_o_tr").show();
            $("#prog_type_o").required();
        } else {
            $("#prog_type_o_tr").hide();
            $("#prog_type_o").val("").notRequired();
        }
    })

    if (hpq_edit_Mode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }
});
$("#addprog_form").on("submit", function (e) {
    e.preventDefault();

    let progData = $("#addprog_form").serializeJSON();

    try {
        var ref_len = progData["hpq_mem_ref"].length
        $("#mem_ref_none").hide();

        let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));
        let progArr = [];

        $.each(hpq_prog, function (i, item) {

            progArr.push(item.pindex);

        });

        let prog_last_index = Math.max.apply(Math, progArr) + 1;

        if (hpq_prog_TEMP == null) {
            hpq_prog_TEMP = [];
            hpq_prog_TEMP_length = 0;
        } else {
            hpq_prog_TEMP_length = hpq_prog_TEMP.length;
        }

        try {
            hpq_prog_TEMP_length = hpq_prog_TEMP.length;
        } catch (error) {
            hpq_prog_TEMP_length = 0;
        }

        if (prog_edit_Mode) {
            hpq_prog_TEMP.splice(prog_index_edited, 1, progData);
        } else {
            if (hpq_prog_TEMP_length < 1) {
                progData["pindex"] = 0;
            } else {
                progData["pindex"] = prog_last_index;
            }
            hpq_prog_TEMP.push(progData);
        }

        Android.setTemp("hpq_prog", JSON.stringify(hpq_prog_TEMP));

        $("#prog_type").off("change");

        $("#addprogModal").modal("hide");
        document.getElementById("addprog_form").reset();

        hpq_prog = hpq_prog_TEMP;

        get_prog(hpq_prog);

    } catch (error) {

        $("#mem_ref_none").show();

    }

});
$("#addprogModal").on("hidden.bs.modal", function (e) {
    document.getElementById("addprog_form").reset();
});
function edit_prog(prog_index_to_edit) {

    prog_edit_Mode = true;
    prog_index_edited = prog_index_to_edit;
    let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));

    $("#addprogModal").modal("show");

    $.each(hpq_prog_TEMP, function (i, progRow) {

        if (progRow.pindex == prog_index_to_edit) {
            for (let key in progRow) {

                $("#addprog_form").find("#" + key).val(progRow[key]);

            }
        }
    });
    $.each(hpq_prog_TEMP, function (i, progRow) {

        if (progRow.pindex == prog_index_to_edit) {
            for (let key in progRow["hpq_mem_ref"]) {

                $("#addprog_form").find("#" + key).attr("checked", "checked");

            }
        }
    });
}
function delete_prog(prog_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));

            var remprog = hpq_prog_TEMP.filter(items => items.pindex != prog_index_to_delete);

            Android.setTemp("hpq_prog", JSON.stringify(remprog));

            get_prog(remprog);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_prog(progData) {

    let c = [];
    $.each(progData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + _prog[item.prog_type] + '</td>');
        c.push('    <td>' + item.prog_name + '</td>');
        c.push('    <td align="center">');
        if (hpq_edit_Mode == 2) {
            c.push('    <a onclick="edit_prog(' + item.pindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_prog(' + item.pindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_prog(' + item.pindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#prog_table").html(c.join("").toString());
}
function get_refs(memData) {

    let c = [];
    $.each(memData, function (i, item) {
        c.push('<div class="form-check">');
        c.push('<input class="form-check-input" name="hpq_mem_ref[]' + item.memindex + '" type="checkbox" value="' + item.memindex + '" id="' + item.memindex + '">');
        c.push('<label class="form-check-label" for="' + item.memindex + '">');
        c.push(item.lname + ', ' + item.fname + ' ' + item.mname);
        c.push('</label>');
        c.push('</div>');
    });

    $("#hpq_ref").html(c.join(""));
}
//#endregion end of add program section

function getProfile() {

    for (var prop in userDetails) {
        $("." + prop).val(userDetails[prop]);
    }

    $("#user-modal").modal("show");

}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}