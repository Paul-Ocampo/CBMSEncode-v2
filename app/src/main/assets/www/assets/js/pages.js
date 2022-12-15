var topbar_index = `
<div class="d-flex align-items-center justify-content-between">
    <a class="logo d-flex align-items-center" href="#">
        <!--<img src="file:///storage/emulated/0/Documents/CBMSEncode/cbms.png" alt="">-->
            <img src="assets/img/cbms.png" alt="">
                <span class="ms-2 dashboard_page"><sup>CBMS Tabaco</sup></span>
            </a>
            <a id="toggle-sidebar-btn" class="hpq_page" hidden="hidden"><i class="bi bi-list toggle-sidebar-btn"></i></a>
        </div><!-- End Logo -->
        <nav class="header-nav ms-auto">
            <ul id="topbar_nav" class="d-flex align-items-center">
                <li class="nav-item dropdown pe-3 dashboard_page">
                    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                        <span class="d-none d-md-block dropdown-toggle username"></span>
                        <i class="bi bi-emoji-sunglasses ps-2" style="font-size: 2rem; color: cornflowerblue;"> </i>
                    </a><!-- End Profile Iamge Icon -->
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li class="dropdown-header">
                            <h6><b class="username"></b></h6>
                            <span>User</span>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item d-flex align-items-center" onclick="getProfile();">
                                <i class="bi bi-gear me-2"></i>
                                <span>My Profile</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                <i class="bi bi-question-circle me-2"></i>
                                <span> Need Help?</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item d-flex align-items-center" onclick="logOut();">
                                <i class="bi bi-box-arrow-right me-2"></i>
                                <span> Sign Out</span>
                            </a>
                        </li>
                    </ul><!-- End Profile Dropdown Items -->
                </li><!-- End Profile Nav -->
            </ul>
    </nav><!-- End Icons Navigation -->`;

var main_index = `
        <div class="row dashboard_page">
            <div class="col-xl-3 col-md-6 col-sm-6 col-6">
                <div class="card info-card mb-2 p-1">
                    <div class="card-body">
                        <h5 class="card-title">Households Surveyed <span>| All</span></h5>
                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-list"></i>
                            </div>
                            <div class="ps-3">
                                <div class="h5 mb-0 font-weight-bold text-primary">
                                    <i id="total_encoded">
                                        <span class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 col-sm-6 col-6">
                <div class="card info-card mb-2 p-1">
                    <div class="card-body">
                        <h5 class="card-title">Households Surveyed <span>| Today</span></h5>
                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-calendar text-info"></i>
                            </div>
                            <div class="ps-3">
                                <div class="h5 mb-0 font-weight-bold text-info">
                                    <i id="encoded_today">
                                        <span class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 col-sm-6 col-6">
                <div class="card info-card mb-2 p-1">
                    <div class="card-body">
                        <h5 class="card-title">Validated Household <span>| All</span></h5>
                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-check-lg text-success"></i>
                            </div>
                            <div class="ps-3">
                                <div class="h5 mb-0 font-weight-bold text-success">
                                    <i id="validated_hpq">
                                        <span class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 col-sm-6 col-6">
                <div class="card info-card mb-2 p-1">
                    <div class="card-body">
                        <h5 class="card-title">Pending For Validation <span>| All</span></h5>
                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-pause-fill text-warning"></i>
                            </div>
                            <div class="ps-3">
                                <div class="h5 mb-0 font-weight-bold text-warning">
                                    <i id="incomplete_hpq">
                                        <span class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <div class="row dashboard_page">
            <div class="col-lg-12">
                <div class="card shadow mb-4">
                    <div class="card-header d-flex flex-row align-items-center justify-content-between mb-4">
                        <h5 class="card-title p-0 m-0 font-weight-bold">Encoded HPQs <span>| All</span></h5>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-success rounded-left" onclick="add_hpq();"><i class="bi bi-plus-circle"></i></button>
                            <button type="button" class="btn btn-primary" onclick="upload_hpq();"><i class="bi bi-upload"></i></button>
                            <button type="button" class="btn btn-secondary rounded-right" onclick="recoverInstancelist();"><i class="bi bi-arrow-repeat"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                        <form id="instancelist_form" method="post">
                            <div class="table-responsive">
                                <table class="table table-hover text-dark" id="dashdataTable" width="100%">
                                    <thead>
                                        <tr class="bg-primary text-center text-light">
                                            <th>Barangay</th>
                                            <th>HCN</th>
                                            <th>Respondent</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="dashboardTable"></tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>`;

var topbar_hpq = `
        <div class="d-flex align-items-center justify-content-between">
            <a class="logo d-flex align-items-center" href="#">
                <!--<img src="file:///storage/emulated/0/Documents/CBMSEncode/cbms.png" alt="">-->
                    <img src="assets/img/cbms.png" alt="">
                    </a>
                    <a id="toggle-sidebar-btn"><i class="bi bi-list toggle-sidebar-btn"></i></a>
                </div><!-- End Logo -->
                <nav class="header-nav ms-auto">
                    <ul id="topbar_nav" class="d-flex align-items-center">
                        <li class="nav-item dropdown pe-3 hpq_page">
                            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <i class="bi bi-gear ps-2 spin-icon" style="font-size: 2rem; color: cornflowerblue;"> </i>
                            </a><!-- End Profile Iamge Icon -->
                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li class="dropdown-header">
                                    <span>Options</span>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li class="addEdit">
                                    <a class="dropdown-item d-flex align-items-center" onclick="saveData('save');">
                                    <i class="bi bi-save"></i><span>Save</span>
                                </a>
                        </li>
                        <li class="addEdit">
                            <hr class="dropdown-divider">
                        </li>
                        <li class="addEdit">
                            <a class="dropdown-item d-flex align-items-center addEdit" onclick="saveData('exit');">
                            <i class="bi bi-save"></i><span>Save and Exit</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" onclick="exit();">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Exit</span>
                        </a>
                    </li>
                </ul><!-- End Profile Dropdown Items -->
            </li>
        </ul>
    </nav><!-- End Icons Navigation -->`;

var sidebar_hpq = `
    <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-item">
            <a id="pages_nav_link" class="nav-link" data-bs-target="#pages_nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-journal-text"></i><span>Page navigation</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="pages_nav" class="nav-content collapse show" role="tablist">
                <li>
                    <a class="nav-link active collapsed" data-bs-toggle="tab" href="#main_page1" rel="main_page1"><i class="bi bi-circle"></i><span>Location and<br>Household Characteristics</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page2" rel="main_page2"><i class="bi bi-circle"></i><span>Household<br>members</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page3" rel="main_page3"><i class="bi bi-circle"></i><span>Hunger and<br>Death</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page4" rel="main_page4"><i class="bi bi-circle"></i><span>Water and Sanitation<br>Tenure status</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page5" rel="main_page5"><i class="bi bi-circle"></i><span>Assets and Amenities<br>Waste Management</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page6" rel="main_page6"><i class="bi bi-circle"></i><span>Calamity and<br>Disaster Preparedness</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page7" rel="main_page7"><i class="bi bi-circle"></i><span>Source of Income<br>Agriculture</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page8" rel="main_page8"><i class="bi bi-circle"></i><span>Programs and<br>Services</span></a>
                </li>
                <li>
                    <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page9" rel="main_page9"><i class="bi bi-circle"></i><span>Notes and<br>Remarks</span></a>
                </li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-target="#members_nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-journal-text"></i><span>Household Members</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <!-- Sidebar -->
            <ul id="members_nav" class="nav-content collapse show" role="tablist">
            </ul>
        </li>
    </ul>`;

var main_hpq = `
    <div class="row hpq_page">
        <form id="addnew_form" method="post">
            <div class="tab-content">
                <div class="tab-pane active" id="main_page1">
                    <div class="row">
                        <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div class="card">
                                <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">A. Identification</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>I.</th>
                                                    <th colspan="3">Location</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td colspan="3"><b>Coordinates</b></td>
                                                </tr>
                                                <tr hidden>
                                                    <td><input name="id" id="id" value="" type="text" class="form-control form-control-sm" hidden></td>
                                                    <td>HPQ ID</td>
                                                    <td>
                                                        <input name="hpq_id" id="hpq_id" value="" type="text" class="form-control form-control-sm" readonly>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>Latitude</td>
                                                    <td>
                                                        <input name="latitude" id="latitude" value="" type="text" class="form-control form-control-sm" required="required" readonly>
                                                    </td>
                                                    <td rowspan="2">
                                                        <div class="btn btn-secondary btn-block" type="button" onclick="showMap();">Get<br><b>GPS</b></div>
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>Longitude</td>
                                                        <td>
                                                            <input name="longitude" id="longitude" value="" type="text" required="required" class="form-control form-control-sm" readonly>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>a. Region</td>
                                                        <td colspan="2">
                                                            <select name="regn" id="regn" class="form-control form-control-sm" aria-readonly="true">
                                                                <option value="05" selected>Region V</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>b. Province</td>
                                                            <td colspan="2">
                                                                <select name="prov" id="prov" class="form-control form-control-sm" aria-readonly="true">
                                                                    <option value="05" selected>Albay</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>c. City/Municipality</td>
                                                            <td colspan="2">
                                                                <select name="mun" id="mun" class="form-control form-control-sm" aria-readonly="true">
                                                                    <option value="017" selected>City of Tabaco</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>d. Barangay</td>
                                                            <td colspan="2">
                                                                <select name="brgy" id="brgy" class="form-control form-control-sm" required="required">
                                                                    <option></option>
                                                                    <option value="001">Agnas (San Miguel Island)</option>
                                                                    <option value="002">Bacolod</option>
                                                                    <option value="003">Bangkilingan</option>
                                                                    <option value="004">Bantayan</option>
                                                                    <option value="005">Baranghawon</option>
                                                                    <option value="006">Basagan</option>
                                                                    <option value="007">Basud (Pob.)</option>
                                                                    <option value="008">Bogñabong</option>
                                                                    <option value="009">Bombon (Pob.)</option>
                                                                    <option value="010">Bonot</option>
                                                                    <option value="012">Buang</option>
                                                                    <option value="013">Buhian</option>
                                                                    <option value="014">Cabagñan</option>
                                                                    <option value="015">Cobo</option>
                                                                    <option value="016">Comon </option>
                                                                    <option value="017">Cormidal</option>
                                                                    <option value="018">Divino Rostro (Pob.)</option>
                                                                    <option value="019">Fatima</option>
                                                                    <option value="020">Guinobat</option>
                                                                    <option value="021">Hacienda (San Miguel Island)</option>
                                                                    <option value="022">Magapo</option>
                                                                    <option value="023">Mariroc</option>
                                                                    <option value="024">Matagbac</option>
                                                                    <option value="025">Oras</option>
                                                                    <option value="026">Oson</option>
                                                                    <option value="027">Panal</option>
                                                                    <option value="029">Pawa</option>
                                                                    <option value="030">Pinagbobong</option>
                                                                    <option value="031">Quinale Cabasan (Pob.)</option>
                                                                    <option value="032">Quinastillojan</option>
                                                                    <option value="033">Rawis (San Miguel Island)</option>
                                                                    <option value="034">Sagurong (San Miguel Island)</option>
                                                                    <option value="035">Salvacion</option>
                                                                    <option value="036">San Antonio</option>
                                                                    <option value="037">San Carlos</option>
                                                                    <option value="011">San Isidro (Boring)</option>
                                                                    <option value="038">San Juan (Pob.)</option>
                                                                    <option value="039">San Lorenzo</option>
                                                                    <option value="040">San Ramon</option>
                                                                    <option value="041">San Roque</option>
                                                                    <option value="042">San Vicente</option>
                                                                    <option value="044">Santo Cristo (Pob.)</option>
                                                                    <option value="045">Sua-Igot</option>
                                                                    <option value="046">Tabiguian</option>
                                                                    <option value="048">Tagas</option>
                                                                    <option value="049">Tayhi (Pob.)</option>
                                                                    <option value="050">Visita (San Miguel Island)</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>e. Zone/Purok</td>
                                                            <td colspan="2">
                                                                <select name="purok" id="purok" class="form-control form-control-sm col-auto"
                                                                    required="required">
                                                                    <option></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="8">8</option>
                                                                    <option value="9">9</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>f. Street</td>
                                                            <td colspan="2">
                                                                <input name="street" id="street" value="None" type="text"
                                                                    class="form-control form-control-sm" required="required">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>II.</th>
                                                            <th>Household Identification Number</th>
                                                            <td colspan="2">
                                                                <input name="hcn" id="hcn" value="" type="number" min="1"
                                                                    class="form-control form-control-sm" required="required">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>III.</th>
                                                            <th>Respondent</th>
                                                            <td colspan="2">
                                                                <input name="respondent" id="respondent" value="" type="text"
                                                                    class="form-control form-control-sm" required="required">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>IV.</th>
                                                            <th>Date encoded</th>
                                                            <td colspan="2">
                                                                <input name="int_date" id="int_date" value="" type="date"
                                                                    class="form-control form-control-sm col-6" required="required" readonly>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>V.</th>
                                                            <th>Interviewer</th>
                                                            <td colspan="2">
                                                                <input name="interviewer" id="interviewer" value="" type="text"
                                                                    class="form-control form-control-sm" readonly>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>VI.</th>
                                                            <th>Field Coordinator</th>
                                                            <td colspan="2">
                                                                <input name="field_coordinator" id="field_coordinator" value="" type="text"
                                                                    class="form-control form-control-sm" readonly>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>VII.</th>
                                                            <th>Barangay Captain</th>
                                                            <td colspan="2">
                                                                <input name="brgy_captain" id="brgy_captain" value="" type="text"
                                                                    class="form-control form-control-sm" readonly>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">B. Housing Characteristics
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td><b>1.</b> House type</td>
                                                        <td width="50%">
                                                            <select name="htype" id="htype"
                                                                class="form-control form-control-sm col-12 col-sm-12 col-md-12 col-lg-12"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Single House</option>
                                                                <option value="2">2 - Duplex</option>
                                                                <option value="3">3 - Multi-unuit residential (three
                                                                    or more units)</option>
                                                                <option value="4">4 -
                                                                    Commercial/Industrial/Agricultural
                                                                    building/House (e.g.,
                                                                    office,factory, others)</option>
                                                                <option value="5">5 - Other housing units(boat, cave
                                                                    and others)</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="htype_o_tr">
                                                        <td>Other type of house</td>
                                                        <td><input name="htype_o" id="htype_o" value="" class="form-control form-control-sm"
                                                            required="required">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>2.</b> Number of CR</td>
                                                        <td><input name="numcr" id="numcr" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>3.</b> Number of bedroom</td>
                                                        <td><input name="numbed" id="numbed" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>4.</b> Roof construction</td>
                                                        <td>
                                                            <select name="roof" id="roof"
                                                                class="form-control form-control-sm col-12 col-sm-12 col-md-12 col-lg-12"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Strong materials (galvanized
                                                                    iron, aluminum, tile, concrete, brick,
                                                                    stone, asbestos)</option>
                                                                <option value="2">2 - Light materials (cogon, nipa,
                                                                    anahaw, bamboo)</option>
                                                                <option value="3">3 - Salvaged/Makeshift materials
                                                                </option>
                                                                <option value="4">4 - Mixed but predominantly strong
                                                                    materials</option>
                                                                <option value="5">5 - Mixed but predominantly light
                                                                    materials</option>
                                                                <option value="6">6 - Mixed but predominantly
                                                                    salvaged materials</option>
                                                                <option value="7">7 - Not applicable</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>5.</b> Wall construction</td>
                                                        <td>
                                                            <select name="wall" id="wall"
                                                                class="form-control form-control-sm col-12 col-sm-12 col-md-12 col-lg-12"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Strong materials (aluminum,
                                                                    tile, concrete, brick, stone, asbestos,
                                                                    wood, plywood)</option>
                                                                <option value="2">2 - Light materials (bamboo,
                                                                    sawali, cogon, nipa, anahaw)</option>
                                                                <option value="3">3 - Salvaged/Makeshift materials
                                                                </option>
                                                                <option value="4">4 - Mixed but predominantly strong
                                                                    materials</option>
                                                                <option value="5">5 - Mixed but predominantly light
                                                                    materials</option>
                                                                <option value="6">6 - Mixed but predominantly
                                                                    salvaged materials</option>
                                                                <option value="7">7 - Not applicable</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td colspan="2"><b>Household Characteristics</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>a.</b> Number of OFWs</td>
                                                        <td width="50%"><input name="numofw" id="numofw" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>b.</b> Number of families</td>
                                                        <td width="50%"><input name="numfam" id="numfam" value="" min="1" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>c.</b> Number of pregnant</td>
                                                        <td width="50%"><input name="numpreg" id="numpreg" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>d.</b> Number of solo-parent</td>
                                                        <td width="50%"><input name="numunipar" id="numunipar" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>e.</b> Number of PWDs</td>
                                                        <td width="50%"><input name="numpwd" id="numpwd" value="" min="0" type="number"
                                                            class="form-control form-control-sm col-sm-3" required="required"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page2">
                        <div class="row">
                            <div class="col-lg-12 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">Household members</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-4">
                                                <label for="phsize"><b>Number of household members</b></label>
                                            </div>
                                            <div class="col-2">
                                                <input name="phsize" id="phsize" value="" type="number" min="1"
                                                    class="form-control form-control-sm" required="required">
                                            </div>
                                            <div class="col-4">
                                                <div id="addmem_btn" class="btn btn-sm btn-success" data-bs-toggle="modal"
                                                    data-bs-target="#addmemModal">
                                                    <i class="bi bi-plus-lg fa-sm fa-fw"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless table-hover text-dark" width="100%"
                                                cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Relation</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="mem_table">
                                                    <!-- Dynamicaly generated html table for hpq_mem -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page3">
                        <div class="row">
                            <div class="col-lg-4 col-xl-4 col-xxl-4 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">L. Hunger</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-wrap"><b>68.</b> In the last 3 months, did
                                                            the household experienced
                                                            hunger and have nothing to eat?</td>
                                                        <td width="50%">
                                                            <select name="hunger_ind" id="hunger_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8 col-xl-8 col-xxl-8  others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">K. Previous household members
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="mdead"><b>Number of previous household
                                                        members</b></label>
                                                </div>
                                                <div class="col-2">
                                                    <input name="mdead" id="mdead" value="" type="number" min="0"
                                                        class="form-control form-control-sm col-12" required="required">
                                                </div>
                                                <div class="col-4">
                                                    <div id="adddeceased_btn" class="btn btn-sm btn-success" onclick="add_deceased();"
                                                        data-bs-toggle="modal" data-bs-target="#adddeceasedModal">
                                                        <i class="bi bi-plus-lg fa-sm fa-fw"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="table table-sm table-borderless table-hover text-dark" width="100%"
                                                cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Sex</th>
                                                        <th>Age</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="deceased_table">
                                                    <!-- Dynamicaly generated html table for hpq_death -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page4">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">M. Water and Sanitation</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <th>73.</th>
                                                        <td>Household"s main source of drinking water</td>
                                                        <td width="50%">
                                                            <select name="water" id="water" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Own use faucet, community
                                                                    water system</option>
                                                                <option value="2">2 - Shared faucet, community water
                                                                    system</option>
                                                                <option value="3">3 - Own use tubed/piped deep well
                                                                </option>
                                                                <option value="4">4 - Shared tubed/piped deep well
                                                                </option>
                                                                <option value="5">5 - Tubed/piped shallow well
                                                                </option>
                                                                <option value="6">6 - Dug well</option>
                                                                <option value="7">7 - Protected spring</option>
                                                                <option value="8">8 - Unprotected spring</option>
                                                                <option value="9">9 - Lake, river, rain and others
                                                                </option>
                                                                <option value="10">10 - Peddler</option>
                                                                <option value="11">11 - Bottled water</option>
                                                                <option value="12">12 - Others, specify</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="water_o_tr">
                                                        <td></td>
                                                        <td class="float-right">Other main source of drinking water
                                                        </td>
                                                        <td width="50%"><input name="water_o" id="water_o" value="" type="text"
                                                            class="form-control form-control-sm">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>74.</th>
                                                        <td>Household"s toilet facility</td>
                                                        <td width="50%">
                                                            <select name="toilet" id="toilet" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Water-sealed, sewer septinc
                                                                    tank, own use</option>
                                                                <option value="2">2 - Water-sealed, sewer septinc
                                                                    tank, shared</option>
                                                                <option value="3">3 - Water-sealed, other
                                                                    depository, own use</option>
                                                                <option value="4">4 - Water-sealed, other
                                                                    depository, shared</option>
                                                                <option value="5">5 - Pit with cover</option>
                                                                <option value="6">6 - Pit without cover</option>
                                                                <option value="7">7 - Others, specify</option>
                                                                <option value="8">8 - None</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="toilet_o_tr">
                                                        <td></td>
                                                        <td class="float-right">Other type of toilet facility</td>
                                                        <td width="50%"><input name="toilet_o" id="toilet_o" value="" type="text"
                                                            class="form-control form-control-sm"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">N. Housing</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <th>75.</th>
                                                        <td>Tenure status of the housing unit and lot occupied by
                                                            the household</td>
                                                        <td width="50%">
                                                            <select name="tenur" id="tenur" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Own or owner-like possesion
                                                                    house and lot</option>
                                                                <option value="2">2 - Rent house/room including lot
                                                                </option>
                                                                <option value="3">3 - Own house/rent lot</option>
                                                                <option value="4">4 - Own house/rent-free lot with
                                                                    consent of owner</option>
                                                                <option value="5">5 - Own house/rent-free lot
                                                                    without consent of owner</option>
                                                                <option value="6">6 - Rent free house and lot with
                                                                    consent of owner</option>
                                                                <option value="7">7 - Rent free house and lot
                                                                    without consent of owner</option>
                                                                <option value="8">8 - Living in a public place with
                                                                    rent</option>
                                                                <option value="9">9 - Living in a public place
                                                                    without rent</option>
                                                                <option value="10">10 - Mortgage</option>
                                                                <option value="11">11 - Others, specify</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="tenur_o_tr">
                                                        <th></th>
                                                        <td class="float-right">Other type of tenur status</td>
                                                        <td width="30%"><input name="tenur_o" id="tenur_o" value="" type="text"
                                                            class="form-control form-control-sm">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>76.</th>
                                                        <td>Does the house have a building permit?</td>
                                                        <td width="50%">
                                                            <select name="bpermit" id="bpermit" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>77.</th>
                                                        <td>When was the house built?</td>
                                                        <td width="50%"><input name="built_when" id="built_when" value="" min="1970" max=""
                                                            type="number" class="form-control form-control-sm" placeholder="Year"
                                                            required="required">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>78.</th>
                                                        <td>How long is the household living in this house?</td>
                                                        <td width="50%"><input name="len_stay" id="len_stay" value="" min="0" type="number"
                                                            class="form-control form-control-sm" placeholder="Number of years"></td>
                                                    </tr>
                                                    <tr>
                                                        <th>79.</th>
                                                        <td>Is there any electricity in dwelling place?</td>
                                                        <td width="50%">
                                                            <select name="elec_ind" id="elec_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="elec_type_tr">
                                                        <th>80.</th>
                                                        <td>What is the primary source of electricity of the
                                                            dwelling place?</td>
                                                        <td width="50%">
                                                            <select name="elec_type" id="elec_type" class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Electric company (APEC)
                                                                </option>
                                                                <option value="2">2 - Gas-powered generator</option>
                                                                <option value="3">3 - Solar-powered generator
                                                                </option>
                                                                <option value="4">4 - Hydro-powered generator
                                                                </option>
                                                                <option value="5">5 - Battery</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="imprnt_tr">
                                                        <th>81.</th>
                                                        <td>Estimated rent of the house/lot</td>
                                                        <td width="50%"><input name="imprnt" id="imprnt" value="" min="300" type="number"
                                                            class="form-control form-control-sm"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">N.1 Relocation</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <th>82.</th>
                                                        <td>Is the household in a relocation area?</td>
                                                        <td width="30%">
                                                            <select name="reloc_ind" id="reloc_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="reloc_tr">
                                                        <th>83.</th>
                                                        <td>Reason for being relocated</td>
                                                        <td width="30%">
                                                            <select name="reloc_reason" id="reloc_reason"
                                                                class="form-control form-control-sm reloc_inputs" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Located on a hazard prone area
                                                                </option>
                                                                <option value="2">2 - No house to live in</option>
                                                                <option value="3">3 - Victim of calamity
                                                                    (natural/man-made)</option>
                                                                <option value="4">4 - Government Infrastructure
                                                                </option>
                                                                <option value="5">5 - Threat of eviction</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="reloc_tr">
                                                        <th>84.</th>
                                                        <td>Beneficiary of what Housing Project</td>
                                                        <td width="30%">
                                                            <select name="housing" id="housing" class="form-control form-control-sm reloc_inputs"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Lot only</option>
                                                                <option value="2">2 - Adopt-A-Home</option>
                                                                <option value="3">3 - Cash Assistance</option>
                                                                <option value="4">4 - Core Shelter</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="reloc_tr">
                                                        <th>85.</th>
                                                        <td>Place currently staying</td>
                                                        <td width="30%">
                                                            <select name="curstay" id="curstay" class="form-control form-control-sm reloc_inputs"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Occupied (Habitable)</option>
                                                                <option value="2">2 - Unoccupied (Habitable)
                                                                </option>
                                                                <option value="3">3 - Unoccupied (Non-habitable)
                                                                </option>
                                                                <option value="4">4 - Vacant lot</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page5">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">P. Assets and Amenities</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th colspan="4">94. Number of owned assets/amenities</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Radio/Radio Casette</td>
                                                        <td width="95"><input name="radio" id="radio" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Televsion</td>
                                                        <td width="95"><input name="tv" id="tv" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>DVD Player</td>
                                                        <td><input name="dvd" id="dvd" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Component/Stereo set</td>
                                                        <td><input name="stereo" id="stereo" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Karaoke/Videoke machine</td>
                                                        <td><input name="karaoke" id="karaoke" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Refrigerator/Freezer</td>
                                                        <td><input name="refrigerator" id="refrigerator" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Electric fan</td>
                                                        <td><input name="efan" id="efan" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Flat iron</td>
                                                        <td><input name="iron" id="iron" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>LPG Gas stove/Gas range</td>
                                                        <td><input name="stove" id="stove" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Washing machine</td>
                                                        <td><input name="washmachine" id="washmachine" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Microwave oven</td>
                                                        <td><input name="oven" id="oven" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Computer set/Laptop</td>
                                                        <td><input name="computer" id="computer" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Internet connection</td>
                                                        <td><input name="internet" id="internet" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Cellphone</td>
                                                        <td><input name="cellphone" id="cellphone" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Landline telephon</td>
                                                        <td><input name="telephone" id="telephone" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Air conditioner</td>
                                                        <td><input name="aircon" id="aircon" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sewing machine</td>
                                                        <td><input name="sew" id="sew" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Car/Jeep/etc.</td>
                                                        <td><input name="car" id="car" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tricycle/Motorcycle</td>
                                                        <td><input name="motor" id="motor" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Sofa/Sala set</td>
                                                        <td><input name="sofa" id="sofa" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dinning set</td>
                                                        <td><input name="dinning" id="dinning" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Agricultural land</td>
                                                        <td><input name="land_agri" id="land_agri" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Residential land</td>
                                                        <td><input name="land_res" id="land_res" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                        <td>Commercial land</td>
                                                        <td><input name="land_com" id="land_com" value="" min="0" type="number"
                                                            class="form-control form-control-sm" required="required"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">Q. Waste Management</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <thead>
                                                    <th colspan="2">96. Garbage disposal?</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td> 1. Garbage collection</td>
                                                        <td width="30%">
                                                            <select name="garb_collect" id="garb_collect" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2. Burning</td>
                                                        <td width="30%">
                                                            <select name="garb_burn" id="garb_burn" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3. Composting</td>
                                                        <td width="30%">
                                                            <select name="garb_compost" id="garb_compost" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Recycling</td>
                                                        <td width="30%">
                                                            <select name="garb_recycle" id="garb_recycle" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5. Waste segregation</td>
                                                        <td width="30%">
                                                            <select name="garb_segregate" id="garb_segregate" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6. Pit with cover</td>
                                                        <td width="30%">
                                                            <select name="garb_pitcover" id="garb_pitcover" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7. Pit without cover</td>
                                                        <td width="30%">
                                                            <select name="garb_pitnocover" id="garb_pitnocover" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8. River/Vacant Lot</td>
                                                        <td width="30%">
                                                            <select name="garb_river" id="garb_river" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>9. Others, specify</td>
                                                        <td width="30%">
                                                            <select name="garb_other_ind" id="garb_other_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="garb_other_o_tr">
                                                        <td colspan="2">
                                                            <input name="garb_other_o" id="garb_other_o" value="" type="text"
                                                                class="form-control form-control-sm" placeholder="Other type of garbage disposal">
                                                        </td>
                                                    </tr>
                                                    <tr class="garb_collector_tr">
                                                        <td><b>97.</b> Collector of garbage</td>
                                                        <td width="30%">
                                                            <select name="garb_collector" id="garb_collector"
                                                                class="form-control form-control-sm garb_collect_inputs">
                                                                <option></option>
                                                                <option value="1">1 - City/Municipality collector
                                                                </option>
                                                                <option value="2">2 - Barangay collector</option>
                                                                <option value="3">3 - Private collector</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="garb_collector_tr">
                                                        <td><b>98.</b> Frequency of collection</td>
                                                        <td width="30%">
                                                            <select name="garb_collector_freq" id="garb_collector_freq"
                                                                class="form-control form-control-sm garb_collect_inputs" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Daily</option>
                                                                <option value="2">2 - 3 times a week</option>
                                                                <option value="3">3 - 2 times a week</option>
                                                                <option value="4">4 - Once a week</option>
                                                                <option value="5">5 - Others, specify</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="garb_collector_freq_o_tr">
                                                        <td colspan="2">
                                                            <input name="garb_collector_freq_o" id="garb_collector_freq_o" value="" type="text"
                                                                class="form-control form-control-sm garb_collect_inputs"
                                                                placeholder="Other type of garbage disposal">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page6">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">R. Calamity</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th width="40%"><label>99. Experienced calamity last 3
                                                            years</label></th>
                                                        <th width="20%"><label>Yes/No</label></th>
                                                        <th width="20%"><label>100. Received assistance?</label>
                                                        </th>
                                                        <th width="20%"><label>101. Received assistance
                                                            from:</label></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1. Typhoon</td>
                                                        <td>
                                                            <select name="calam_typhoon_ind" id="calam_typhoon_ind"
                                                                class="form-control form-control-sm" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_typhoon_aid_ind" id="calam_typhoon_aid_ind"
                                                                class="form-control form-control-sm calam_typhoon_inputs">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_typhoon_aid_source" id="calam_typhoon_aid_source"
                                                                class="form-control form-control-sm calam_typhoon_inputs">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2. Flood</td>
                                                        <td>
                                                            <select name="calam_flood_ind" id="calam_flood_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_flood_aid_ind" id="calam_flood_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_flood_aid_source" id="calam_flood_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3. Drought</td>
                                                        <td>
                                                            <select name="calam_drought_ind" id="calam_drought_ind"
                                                                class="form-control form-control-sm" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_drought_aid_ind" id="calam_drought_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_drought_aid_source" id="calam_drought_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Earthquake</td>
                                                        <td>
                                                            <select name="calam_earthquake_ind" id="calam_earthquake_ind"
                                                                class="form-control form-control-sm" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_earthquake_aid_ind" id="calam_earthquake_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_earthquake_aid_source" id="calam_earthquake_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5. Volcanic eruption</td>
                                                        <td>
                                                            <select name="calam_eruption_ind" id="calam_eruption_ind"
                                                                class="form-control form-control-sm" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_eruption_aid_ind" id="calam_eruption_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_eruption_aid_source" id="calam_eruption_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6. Fire</td>
                                                        <td>
                                                            <select name="calam_fire_ind" id="calam_fire_ind" class="form-control form-control-sm"
                                                                required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_fire_aid_ind" id="calam_fire_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_fire_aid_source" id="calam_fire_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7. Epidemic/Pandemic</td>
                                                        <td>
                                                            <select name="calam_epidemic_ind" id="calam_epidemic_ind"
                                                                class="form-control form-control-sm" required="required">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_epidemic_aid_ind" id="calam_epidemic_aid_ind"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Yes</option>
                                                                <option value="2">2 - No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select name="calam_epidemic_aid_source" id="calam_epidemic_aid_source"
                                                                class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - Government</option>
                                                                <option value="2">2 - Non-Government Organizations
                                                                </option>
                                                                <option value="3">3 - Relatives</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr class="calam_evac_tr">
                                                        <td colspan="2"><b>98. </b>Temporary evacuated to:</td>
                                                        <td colspan="2">
                                                            <select name="calam_evac" id="calam_evac" class="form-control form-control-sm">
                                                                <option></option>
                                                                <option value="1">1 - School</option>
                                                                <option value="2">2 - Church</option>
                                                                <option value="3">3 - Covered court/Gym</option>
                                                                <option value="4">4 - Relative"s house</option>
                                                                <option value="5">5 - Neighbor"s house</option>
                                                                <option value="6">6 - Brgy. Hall/Chapel</option>
                                                                <option value="7">7 - LGU Designated evacuation
                                                                    centers</option>
                                                                <option value="8">8 - Did not evacuate</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page7">
                        <div class="row">
                            <div class="col-lg-12 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">T. Source of Income</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table table-sm table-borderless text-dark" cellspacing="0">
                                                        <thead>
                                                            <th width="5%">T.1.</th>
                                                            <th>Entreprenuerial Activities</th>
                                                            <th width="10%">Yes/No</th>
                                                            <th width="20%">In-cash</th>
                                                            <th width="20%">In-kind</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>103.</th>
                                                                <td>Crop farming/Gardening</td>
                                                                <td>
                                                                    <select name="crop_ind" id="crop_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="crop_csh" id="crop_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="crop_knd" id="crop_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>104.</th>
                                                                <td>Livestock/Poultry raising</td>
                                                                <td>
                                                                    <select name="live_ind" id="live_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="live_csh" id="live_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="live_knd" id="live_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>105.</th>
                                                                <td>Fishing</td>
                                                                <td>
                                                                    <select name="fish_ind" id="fish_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="fish_csh" id="fish_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="fish_knd" id="fish_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>106.</th>
                                                                <td>Forestry and Hunting</td>
                                                                <td>
                                                                    <select name="hunt_ind" id="hunt_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="hunt_csh" id="hunt_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="hunt_knd" id="hunt_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>107.</th>
                                                                <td>Wholesale and Retail</td>
                                                                <td>
                                                                    <select name="sale_ind" id="sale_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="sale_csh" id="sale_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="sale_knd" id="sale_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>108.</th>
                                                                <td>Manufacturing</td>
                                                                <td>
                                                                    <select name="manu_ind" id="manu_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="manu_csh" id="manu_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="manu_knd" id="manu_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>109.</th>
                                                                <td>Community, Social, Recreational, and Personal
                                                                    Activities</td>
                                                                <td>
                                                                    <select name="social_ind" id="social_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="social_csh" id="social_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="social_knd" id="social_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>110.</th>
                                                                <td>Transportation/Communication Services</td>
                                                                <td>
                                                                    <select name="trans_ind" id="trans_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="trans_csh" id="trans_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="trans_knd" id="trans_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>111.</th>
                                                                <td>Mining and Quarrying</td>
                                                                <td>
                                                                    <select name="quar_ind" id="quar_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="quar_csh" id="quar_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="quar_knd" id="quar_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>112.</th>
                                                                <td>Construction</td>
                                                                <td>
                                                                    <select name="cons_ind" id="cons_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="cons_csh" id="cons_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="cons_knd" id="cons_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>113.</th>
                                                                <td>Activities not elsewhere classified</td>
                                                                <td>
                                                                    <select name="oea_ind" id="oea_ind" class="form-control form-control-sm"
                                                                        required="required">
                                                                        <option></option>
                                                                        <option value="1">1 - Yes</option>
                                                                        <option value="2">2 - No</option>
                                                                    </select>
                                                                </td>
                                                                <td><input name="oea_csh" id="oea_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                                <td><input name="oea_knd" id="oea_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>114.</th>
                                                                <th colspan="2">Total Net Income from
                                                                    Entreprenuerial Activities</th>
                                                                <td><input name="totea_csh" id="totea_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                                <td><input name="totea_knd" id="totea_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                            <tr>
                                                                <th colspan="3">T.2. 115. Total Salaries and Wages
                                                                    from employed members</th>
                                                                <td><input name="totwage_csh" id="totwage_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                                <td><input name="totwage_knd" id="totwage_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table table-sm table-borderless text-dark" cellspacing="0">
                                                        <thead>
                                                            <th width="5%">T.3.</th>
                                                            <th>Other sources of income</th>
                                                            <th width="20%">In-cash</th>
                                                            <th width="20%">In-kind</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>116.</th>
                                                                <td>Net share of crops, fruits, and vegetables
                                                                    produced, aquaculture products
                                                                    harvested,
                                                                    livestock or poultry raised by other households
                                                                </td>
                                                                <td><input name="ags_csh" id="ags_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="ags_knd" id="ags_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>117.</th>
                                                                <td>Remittances from Overseas Filipino Workers</td>
                                                                <td><input name="ofw_csh" id="ofw_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="ofw_knd" id="ofw_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>118.</th>
                                                                <td>Cash receipts, gifts, support, relief, and other
                                                                    forms of assistance from
                                                                    abroad
                                                                </td>
                                                                <td><input name="supf_csh" id="supf_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="supf_knd" id="supf_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>119.</th>
                                                                <td>Cash receipts, support, relief from domestic
                                                                    sources</td>
                                                                <td><input name="supr_csh" id="supr_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="supr_knd" id="supr_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>120.</th>
                                                                <td>Rentals received from non-agricultural lands,
                                                                    buildings, spaces, and other
                                                                    properties</td>
                                                                <td><input name="rent_csh" id="rent_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="rent_knd" id="rent_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>121.</th>
                                                                <td>Interest from bankdeposits, interest from loans
                                                                    extended to other families.
                                                                </td>
                                                                <td><input name="intr_csh" id="intr_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="intr_knd" id="intr_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>122.</th>
                                                                <td>Pension and retirement, workmen"s compensation,
                                                                    and social security benefits
                                                                </td>
                                                                <td><input name="pen_csh" id="pen_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="pen_knd" id="pen_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>123.</th>
                                                                <td>Dividends from investments</td>
                                                                <td><input name="div_csh" id="div_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="div_knd" id="div_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>124.</th>
                                                                <td>Other sources of income not elsewhere classified
                                                                </td>
                                                                <td><input name="oth_csh" id="oth_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                                <td><input name="oth_knd" id="oth_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>125.</th>
                                                                <th>Total Gross income from other source of income
                                                                </th>
                                                                <td><input name="etot_csh" id="etot_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                                <td><input name="etot_knd" id="etot_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                            <tr>
                                                                <th>126</th>
                                                                <th>Total estimated rent of the house</th>
                                                                <td colspan="2"><input name="imprnttot" id="imprnttot" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                            <tr>
                                                                <th>127.</th>
                                                                <th>Total household income in cash and in kind</th>
                                                                <td><input name="totin_csh" id="totin_csh" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                                <td><input name="totin_knd" id="totin_knd" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                            <tr>
                                                                <th>128.</th>
                                                                <th>Total household income</th>
                                                                <td colspan="2"><input name="totin" id="totin" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm" required="required" readonly></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-8 col-xl-6 col-xxl-6 agricrop">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">U. Agriculture - Crop Farming
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <th>129.</th>
                                                                <td>Ownership status of household on the
                                                                    agricultural land</td>
                                                                <td width="30%">
                                                                    <select name="agri_own_id" id="agri_own_id"
                                                                        class="form-control form-control-sm agri_inputs">
                                                                        <option></option>
                                                                        <option value="1">1 - Owned</option>
                                                                        <option value="2">2 - Owner-like possesion
                                                                        </option>
                                                                        <option value="3">3 - Tenant</option>
                                                                        <option value="4">4 - Rent</option>
                                                                        <option value="5">5 - REnt free</option>
                                                                        <option value="6">6 - CLT/CLOA</option>
                                                                        <option value="7">7 - CADT/CALT</option>
                                                                        <option value="8">8 - CBFMA/Stewardship
                                                                        </option>
                                                                        <option value="9">9 - Others, specify
                                                                        </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr class="agri_own_o_tr">
                                                                <th></th>
                                                                <td colspan="2"><input name="agri_own_o" id="agri_own_o" value="" type="text"
                                                                    class="form-control form-control-sm agri_inputs"
                                                                    placeholder="Other type of land ownership">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>130.</th>
                                                                <td>Total area of agricultural land (m<sup>2</sup>)
                                                                </td>
                                                                <td width="30%"><input name="agri_own_area" id="agri_own_area" value="0" min="0"
                                                                    type="number" class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="2">Area per type of crops</th>
                                                                <th>Area (m<sup>2</sup>)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1.</td>
                                                                <td width="50%"> Rice</td>
                                                                <td width="45%"><input name="agri_rice" id="agri_rice" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2. </td>
                                                                <td>Vegetables</td>
                                                                <td width="20%"><input name="agri_vegy" id="agri_vegy" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3. </td>
                                                                <td>Corn</td>
                                                                <td width="20%"><input name="agri_corn" id="agri_corn" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4. </td>
                                                                <td>Sweet Potato</td>
                                                                <td width="20%"><input name="agri_potato" id="agri_potato" value="0" min="0"
                                                                    type="number" class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>5. </td>
                                                                <td>Cassava</td>
                                                                <td width="20%"><input name="agri_cassava" id="agri_cassava" value="0" min="0"
                                                                    type="number" class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>6. </td>
                                                                <td>Hemp (Abaca)</td>
                                                                <td width="20%"><input name="agri_hemp" id="agri_hemp" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>7. </td>
                                                                <td>Coconut</td>
                                                                <td width="20%"><input name="agri_coco" id="agri_coco" value="0" min="0" type="number"
                                                                    class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>8. </td>
                                                                <td>Others, specify</td>
                                                                <td width="20%"><input name="agri_other" id="agri_other" value="0" min="0"
                                                                    type="number" class="form-control form-control-sm agri_inputs">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td width="20%" colspan="2"><input name="agri_other_o" id="agri_other_o" value=""
                                                                    type="text" class="form-control form-control-sm agri_inputs"
                                                                    placeholder="Other type of crops"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page8">
                        <div class="row">
                            <div class="col-md-12 col-lg-10 col-xl-8 col-xxl-8 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">V. Programs</h6>
                                        <a name="addprogbtn" id="addprogbtn" class="btn btn-success btn-sm"
                                            data-bs-toggle="modal" data-bs-target="#addprogModal">
                                            <i class="bi bi-plus-lg"></i>
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless col-sm-12 col-md-12 col-lg-9 col-xl-6 text-dark"
                                                cellspacing="10">
                                                <tr>
                                                    <td>
                                                        <b>Add programs received by the household</b>
                                                    </td>
                                                    <td width="20%">
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table class="table table-sm table-borderless table-hover text-dark" width="100%"
                                                cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th width="40%">Types of programs</th>
                                                        <th width="40%">Name of program</th>
                                                        <th width="20%">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="prog_table">
                                                    <!-- Dynamicaly generated html table for hpq_prog -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="main_page9">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 others">
                                <div class="card">
                                    <div class="card-header mb-4 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">VI. Notes and Remarks</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-sm table-borderless text-dark" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Notes and Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colspan="2">
                                                            <textarea name="note" id="note" value="" type="textarea"
                                                                class="form-control form-control-sm" required="required"></textarea>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%">Form status</td>
                                                        <td>
                                                            <select id="hpq_stat" name="hpq_stat" class="form-control form-control-sm"
                                                                required="required">
                                                                <option value="0">Incomplete</option>
                                                                <option value="1">Not validated</option>
                                                                <option value="2">Validated</option>
                                                                <option value="3" disabled>Uploaded</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><label>Encoder:</label></td>
                                                        <td>
                                                            <input name="encoder" id="encoder" value="" type="number"
                                                                class="form-control form-control-sm" readonly>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><label>Filename:</label></td>
                                                        <td>
                                                            <input name="filename" id="filename" value="" type="text"
                                                                class="form-control form-control-sm" readonly>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
        <div class="py-3 d-flex flex-row align-items-center justify-content-between">
            <button id="prev" class="btn btn-primary text-white mr-1 ml-1" disabled>
                <i class="bi bi-arrow-left"></i> Prev
            </button>
            <button id="next" class="btn btn-primary text-white mr-1 ml-1">
                Next <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    </div>`;