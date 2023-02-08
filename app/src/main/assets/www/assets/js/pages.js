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
    <a id="toggle-sidebar-btn">
        <i class="bi bi-list toggle-sidebar-btn"></i>
    </a>
</div>
<!-- End Logo -->
<nav class="header-nav ms-auto">
    <ul id="topbar_nav" class="d-flex align-items-center">
        <li class="nav-item dropdown pe-3 hpq_page">
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-gear ps-2 spin-icon" style="font-size: 2rem; color: cornflowerblue;"></i>
            </a>
            <!-- End Profile Iamge Icon -->
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                    <span>Options</span>
                </li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li class="add_edit_hpq">
                    <a class="dropdown-item d-flex align-items-center" onclick="saveData('save');">
                        <i class="bi bi-save"></i>
                        <span>Save</span>
                    </a>
                </li>
                <li class="add_edit_hpq">
                    <hr class="dropdown-divider">
                </li>
                <li class="add_edit_hpq">
                    <a class="dropdown-item d-flex align-items-center" onclick="saveData('exit');">
                        <i class="bi bi-save"></i>
                        <span>Save and Exit</span>
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
            </ul>
            <!-- End Profile Dropdown Items -->
        </li>
    </ul>
</nav>
<!-- End Icons Navigation -->`;

var sidebar_hpq = `<ul class="sidebar-nav" id="sidebar-nav">
<li class="nav-item">
    <a id="pages_nav_link" class="nav-link" data-bs-target="#pages_nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-journal-text"></i>
        <span>Page navigation</span>
        <i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="pages_nav" class="nav-content collapse show" role="tablist">
        <li>
            <a class="nav-link active collapsed" data-bs-toggle="tab" href="#main_page1" rel="main_page1">
                <i class="bi bi-circle"></i>
                <span>
                    Location and
                    <br>
                    Household Characteristics
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page2" rel="main_page2">
                <i class="bi bi-circle"></i>
                <span>
                    Household
                    <br>
                    members
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page3" rel="main_page3">
                <i class="bi bi-circle"></i>
                <span>
                    Water and Sanitation
                    <br>
                    Housing, Assets
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page4" rel="main_page4">
                <i class="bi bi-circle"></i>
                <span>
                    Waste Management
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page5" rel="main_page5">
                <i class="bi bi-circle"></i>
                <span>
                    Source of Income
                    <br>
                    Agriculture
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page6" rel="main_page6">
                <i class="bi bi-circle"></i>
                <span>
                    Climate Change
                    <br>
                    Disaster Preparedness
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page7" rel="main_page7">
                <i class="bi bi-circle"></i>
                <span>
                    Hunger and
                    <br>
                    Death
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page8" rel="main_page8">
                <i class="bi bi-circle"></i>
                <span>
                    Programs and
                    <br>
                    Services
                </span>
            </a>
        </li>
        <li>
            <a class="nav-link collapsed" data-bs-toggle="tab" href="#main_page9" rel="main_page9">
                <i class="bi bi-circle"></i>
                <span>
                    Notes and
                    <br>
                    Remarks
                </span>
            </a>
        </li>
    </ul>
</li>
<li class="nav-item">
    <a class="nav-link" data-bs-target="#members_nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-journal-text"></i>
        <span>Household Members</span>
        <i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <!-- Sidebar -->
    <ul id="members_nav" class="nav-content collapse show" role="tablist"></ul>
</li>
</ul>`;

var main_hpq = `<div class="row hpq_page">
<form id="addnew_form" method="post">
    <div class="tab-content">
        <div class="tab-pane active" id="main_page1">
            <div id="SectionIntro" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">INTRODUCTION</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <label class="form-label">Community-Based Monitoring System Tabaco City</label>
                        <div class="form-text"></div>
                    </div>
                    <div class="row mb-3">
                        <label class="form-label">Household Profile Questionnaire 2023</label>
                        <div class="form-text"></div>
                    </div>
                    <div class="row mb-3">
                        <label class="form-label">This survey is authorized by the Local Government.  All information collected will be held strictly confidential.</label>
                        <div class="form-text"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">HPQ Form ID:</label>
                            <div class="form-text"></div>
                        </div>
                        <div class="col-sm-6">
                            <input name="id" id="id" type="text" hidden>
                            <input name="hpq_id" id="hpq_id" type="text" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                    <div id="sec_gps" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">GPS Coordinates</h5>
                            <h6 class="card-title-hint"></h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Latitude</label>
                                    <div class="form-text"></div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="latitude" id="latitude" type="number" class="form-control form-control-sm" required="required" readonly="readonly">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Longitude</label>
                                    <div class="form-text"></div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="longitude" id="longitude" type="number" class="form-control form-control-sm" required="required" readonly="readonly">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <div class="btn btn-secondary btn-block" type="button" onclick="showMap();">
                                        Capture
                                        <b>GPS</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionLocation" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">Location</h5>
                    <h6 class="card-title-hint">Lokasyon</h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Region</label>
                            <div class="form-text">Rehiyon</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="regn" id="regn" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="05" selected>REGION V (Bicol Region)</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Province</label>
                            <div class="form-text">Lalawigan</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="prov" id="prov" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="05" selected>ALBAY</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">City/Municipality</label>
                            <div class="form-text">Lungsod/Bayan</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="mun" id="mun" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="017" selected>CITY OF TABACO</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Zone</label>
                            <div class="form-text">Zone</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="zone" id="zone" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Zone 1</option>
                                <option value="2">Zone 2</option>
                                <option value="3">Zone 3</option>
                                <option value="4">Zone 4</option>
                                <option value="5">Zone 5</option>
                                <option value="6">Zone 6</option>
                                <option value="7">Zone 7</option>
                                <option value="8">Zone 8</option>
                                <option value="9">Zone 9</option>
                                <option value="99">None</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Village</label>
                            <div class="form-text">Barangay</div>
                        </div>
                        <div class="col-sm-6">
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
                                <option value="011">San Isidro (Boring)</option>
                                <option value="012">Buang</option>
                                <option value="013">Buhian</option>
                                <option value="014">Cabagñan</option>
                                <option value="015">Cobo</option>
                                <option value="016">Comon</option>
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
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Sub-village</label>
                            <div class="form-text">Purok</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="purok" id="purok" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Purok 1</option>
                                <option value="2">Purok 2</option>
                                <option value="3">Purok 3</option>
                                <option value="4">Purok 4</option>
                                <option value="5">Purok 5</option>
                                <option value="6">Purok 6</option>
                                <option value="7">Purok 7</option>
                                <option value="8">Purok 8</option>
                                <option value="9">Purok 9</option>
                                <option value="99">NONE</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Street</label>
                            <div class="form-text">Kalye</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="street" id="street" type="text" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Household Identification Number</label>
                            <div class="form-text">Numerong Pagkakakilanlan ng Sambahayan</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="hcn" id="hcn" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Respondent</label>
                            <div class="form-text">Nakapanayam</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="respondent" id="respondent" type="text" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Date of interview</label>
                            <div class="form-text">Petsa ng panayam</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="int_date" id="int_date" type="date" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Time started</label>
                            <div class="form-text">Oras nagsimula</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="start_time" id="start_time" type="time" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionDwell" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">DWELLING</h5>
                    <h6 class="card-title-hint">TIRAHAN</h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">In what type of building does the household reside?</label>
                            <div class="form-text">Ano ang uri ng tirahan ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="house_type" id="house_type" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Single house</option>
                                <option value="2">Duplex</option>
                                <option value="3">Multi-unit residential (three units or more)</option>
                                <option value="4">Commercial/industrial/agricultural building/house</option>
                                <option value="5">Others (boat, cave, etc.)</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 house_type_o">
                        <div class="col-sm-6">
                            <label class="form-label">Other type of dwelling</label>
                            <div class="form-text">Iba oang uri ng tirahan</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="house_type_o" id="house_type_o" type="text" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many restrooms does this housing unit have?</label>
                            <div class="form-text">Ilang palikuran mayroon ang tirahan ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numcr" id="numcr" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many bedrooms does this housing unit have?</label>
                            <div class="form-text">Ilang silid/kwarto mayroon ang tirahan ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numbed" id="numbed" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">What type of construction materials are the roofs made of?</label>
                            <div class="form-text">Anong uri ng materyales ang ginamit sa paggawa ng bubong ng tirahan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="roof" id="roof" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Strong materials (concrete, brick, stone, wood, galvanized iron)</option>
                                <option value="2">Light materials (bamboo, sawali, cogon, nipa)</option>
                                <option value="3">Salvaged/makeshift materials</option>
                                <option value="4">Mixed but predominantly strong materials</option>
                                <option value="5">Mixed but predominantly light materials</option>
                                <option value="6">Mixed but predominantly salvaged materials</option>
                                <option value="7">Not applicable</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">What type of construction materials are the walls made of?</label>
                            <div class="form-text">Anong uri ng materyales ang ginamit sa paggawa ng dingding ng tirahan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="wall" id="wall" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Strong materials (concrete, brick, stone, wood, galvanized iron)</option>
                                <option value="2">Light materials (bamboo, sawali, cogon, nipa)</option>
                                <option value="3">Salvaged/makeshift materials</option>
                                <option value="4">Mixed but predominantly strong materials</option>
                                <option value="5">Mixed but predominantly light materials</option>
                                <option value="6">Mixed but predominantly salvaged materials</option>
                                <option value="7">Not applicable</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionID0" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">HOUSEHOLD CHARACTERISTICS</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many families are there in the household?</label>
                            <div class="form-text">Ilan ang nukleyar na pamilya sa sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="nnucfam" id="nnucfam" type="number" min="1" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3 nnucfam_msg_null">
                        <div class="alert alert-danger" role="alert">
                            ERROR: THERE MUST BE ATLEAST ONE NUCLEAR FAMILY!
                        </div>
                    </div>
                    <div class="row mb-3 nnucfam_msg_high">
                        <div class="alert alert-warning" role="alert">
                            WARNING: NUMBER OF NUCLEAR FAMILIY IS TOO HIGH!
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many members of the households are OFWs?</label>
                            <div class="form-text">Ilang miyembro dito sa inyong sambahayan ang OFW?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numofw" id="numofw" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many members of the households are pregnant?</label>
                            <div class="form-text">Ilang miyembro dito sa inyong sambahayan ang buntis?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numpreg" id="numpreg" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many members of the households are solo-parent?</label>
                            <div class="form-text">Ilang miyembro dito sa inyong sambahayan ang solo-parent?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numunipar" id="numunipar" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many members of the households are PWD?</label>
                            <div class="form-text">Ilang miyembro dito sa inyong sambahayan ang PWD?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="numpwd" id="numpwd" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page2">
            <div id="SectionDemog" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title">DEMOGRAPHY</h5>
                    <div class="row mb-3">
                        <div>
                            <label class="form-label">(10) How many members are there in the household including OFWs?</label>
                            <div class="form-text">Ilang miyembro mayroon dito sa inyong sambahayan kabilang ang OFW?</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <input name="phsize" id="phsize" type="number" class="form-control form-control-sm">
                        </div>
                        <div class="col-sm-6">
                            <div id="add_hpq_mem_btn" class="btn btn-sm btn-success" onclick="add_mem();">
                                <i class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="table-responsive">
                            <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Relation</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="hpq_mem_table">
                                    <!-- Dynamicaly generated html table for hpq_mem --></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page3">
            <div id="SectionWatSan" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">WATER AND SANITATION</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">What is your household's main source of drinking water?</label>
                            <div class="form-text">Ano ang pinagkukunan ng tubig na inumin ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="water" id="water" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Own use faucet, community water system</option>
                                <option value="2">Shared faucet, community water system</option>
                                <option value="3">Own use tubed/piped deep well</option>
                                <option value="4">Shared tubed/piped deep well</option>
                                <option value="5">Tubed/piped shallow well</option>
                                <option value="6">Dug well</option>
                                <option value="7">Protected spring</option>
                                <option value="8">Unprotected spring</option>
                                <option value="9">Lake, river, rain and others</option>
                                <option value="10">Peddler</option>
                                <option value="11">Bottled water</option>
                                <option value="12">Others</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 water_o">
                        <div class="col-sm-6">
                            <label class="form-label">Other source of water</label>
                            <div class="form-text">Iba pang pinagkukunan ng tubig</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="water_o" id="water_o" type="text" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">What type of toilet facility does the household use?</label>
                            <div class="form-text">Anong uri ng palikuran ang ginagamit ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="toil" id="toil" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Water-sealed, sewer septic tank, sariling gamit</option>
                                <option value="2">Water-sealed, sewer septic tank, kasalo ang ibang sambahayan</option>
                                <option value="3">Water-sealed, other depository, sariling gamit</option>
                                <option value="4">Water-sealed, other depository, kasalo ang ibang sambahayan</option>
                                <option value="5">Closed pit</option>
                                <option value="6">Open pit</option>
                                <option value="7">Others (pail system, and others)</option>
                                <option value="8">None</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 toil_o">
                        <div class="col-sm-6">
                            <label class="form-label">Other type of toilet facility</label>
                            <div class="form-text">Iba pang uri ng palikuran</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="toil_o" id="toil_o" type="text" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionHous" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">HOUSING</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">What is the tenure status of the housing unit and lot occupied by your household?</label>
                            <div class="form-text">Ano ang katayuan ng inyong sambahayan sa pamamalagi sa inyong tinitirahan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="tenur" id="tenur" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Owner, owner-like possession of house and lot</option>
                                <option value="2">Rent house/room including lot</option>
                                <option value="3">Own house, rent lot</option>
                                <option value="4">Own house, rent-free lot with consent of owner</option>
                                <option value="5">Own house, rent-free lot without consent of owner</option>
                                <option value="6">Rent-free house and lot with consent of owner</option>
                                <option value="7">Rent-free house and lot without consent of owner</option>
                                <option value="8">Living in a public space with rent</option>
                                <option value="9">Living in a public space without rent</option>
                                <option value="10">Other tenure status</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 tenur_o">
                        <div class="col-sm-6">
                            <label class="form-label">Other tenure status</label>
                            <div class="form-text">Iba pang katayuan</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="tenur_o" id="tenur_o" type="text" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Does the house your household lives in have a building permit?</label>
                            <div class="form-text">Ang bahay ba na tinitirhan ng inyong sambahayan ay may building permit?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="build_permit" id="build_permit" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">When was the house your household lives in built?</label>
                            <div class="form-text">Kailan naitayo ang bahay na tinitirahan ng inyong sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="built_when" id="built_when" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How long has your household lived in the house?</label>
                            <div class="form-text">Gaano na katagal naninirahan ang inyong sambahayan sa bahay?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="len_stay" id="len_stay" type="number" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3 imprnt">
                        <div class="col-sm-6">
                            <label class="form-label">In your own estimate, how much is the imputed rent per month for the house and/or lot?</label>
                            <div class="form-text">Sa inyong palagay, magkano ang tantiyang upa sa isang buwan sa inyong tinitirahan kung ito ay inyong inuupahan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="imprnt" id="imprnt" type="number" class="form-control form-control-sm" required="">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Is there an electricity in the dwelling place?</label>
                            <div class="form-text">May kuryente ba sa inyong tinitirahan?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="welec" id="welec" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div id="SectionElecDetails" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">What is the source of electricity in the dwelling place?</h5>
                            <h6 class="card-title-hint">Ano ang pinagmumulan ng kuryente sa inyong tirahan?</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Electric company</label>
                                    <div class="form-text">Electric Company</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="elec_company" id="elec_company" class="form-control form-control-sm SectionElecDetails" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Generator</label>
                                    <div class="form-text">Generator</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="elec_generator" id="elec_generator" class="form-control form-control-sm SectionElecDetails" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Solar</label>
                                    <div class="form-text">Solar</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="elec_solar" id="elec_solar" class="form-control form-control-sm SectionElecDetails" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Battery</label>
                                    <div class="form-text">Battery</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="elec_battery" id="elec_battery" class="form-control form-control-sm SectionElecDetails" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Others</label>
                                    <div class="form-text">Iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="elec_source_o" id="elec_source_o" class="form-control form-control-sm SectionElecDetails" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 elec_source_o_lb">
                                <div class="col-sm-6">
                                    <label class="form-label">Other source</label>
                                    <div class="form-text">Iba pang pinagkukunan ng kuryente</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="elec_source_o_lb" id="elec_source_o_lb" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Does the household currently reside in the relocation area?</label>
                            <div class="form-text">Kasalukuyan bang naninirahan ang sambahayan sa relocation area?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="reloc_ind" id="reloc_ind" class="form-control form-control-sm" required="">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div id="SectionRelocDetails" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Details of being relocated</h5>
                            <h6 class="card-title-hint"></h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">What is the reason for moving the household to the relocation area?</label>
                                    <div class="form-text">Ano ang dahilan ng paglipat ng sambahayan sa relocation area?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="reloc_reason" id="reloc_reason" class="form-control form-control-sm SectionRelocDetails" required="">
                                        <option></option>
                                        <option value="1">In a dangerous are</option>
                                        <option value="2">No place to live</option>
                                        <option value="3">Victim of calamity</option>
                                        <option value="4">Government Infrastructure (Public)</option>
                                        <option value="5">Threat of eviction (private)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">What housing project?</label>
                                    <div class="form-text">Ano ang programang pabahay kung saan kayo ay benipesyaryo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="housing_proj" id="housing_proj" class="form-control form-control-sm SectionRelocDetails" required="">
                                        <option></option>
                                        <option value="1">Lot only</option>
                                        <option value="2">Adopt-A-Home</option>
                                        <option value="3">Cash Assistance</option>
                                        <option value="4">Core Shelter</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Where is your household currently residing?</label>
                                    <div class="form-text">Saan kasalukuyang nakaitira ang inyong sambahayan?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="curstay" id="curstay" class="form-control form-control-sm SectionRelocDetails" required="">
                                        <option></option>
                                        <option value="1">Occupied (Habitable)</option>
                                        <option value="2">Unoccupied (Habitable)</option>
                                        <option value="3">Unocuppied (Non-habitable)</option>
                                        <option value="4">Vacant lot</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionAssets" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">ASSETS / AMENITIES</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Radiodoes the household own?</label>
                            <div class="form-text">Ilang Radio ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="radio" id="radio" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Televisiondoes the household own?</label>
                            <div class="form-text">Ilang Telebisyon ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="tv" id="tv" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many VHS/VCD/DVD Player does the household own?</label>
                            <div class="form-text">Ilang VHS/VCD/DVD Player ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="vplayer" id="vplayer" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Stereo/Component does the household own?</label>
                            <div class="form-text">Ilang Stereo/Component ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="stereo" id="stereo" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Karaoke does the household own?</label>
                            <div class="form-text">Ilang Karaoke ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="karaoke" id="karaoke" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Refrigerator does the household own?</label>
                            <div class="form-text">Ilang Refrigerator ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="ref" id="ref" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Electric Fan does the household own?</label>
                            <div class="form-text">Ilang Electric Fan ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="efan" id="efan" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Electric Iron/Flat Iron does the household own?</label>
                            <div class="form-text">Ilang Electric Iron/Flat Iron ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="iron" id="iron" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many LPG/Gas Stove/Range does the household own?</label>
                            <div class="form-text">Ilang LPG/Gas Stove/Range ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="stove" id="stove" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Washing Machine does the household own?</label>
                            <div class="form-text">Ilang Washing Machine ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="wmach" id="wmach" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Microwave Oven does the household own?</label>
                            <div class="form-text">Ilang Microwave Oven ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="microw" id="microw" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Computer does the household own?</label>
                            <div class="form-text">Ilang Computer ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="computer" id="computer" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Internet Connection does the household own?</label>
                            <div class="form-text">Ilang Internet Connection ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="internet" id="internet" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Cellphone does the household own?</label>
                            <div class="form-text">Ilang Cellphone ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="celfone" id="celfone" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Telephone does the household own?</label>
                            <div class="form-text">Ilang Telepono ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="telefone" id="telefone" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Aircon does the household own?</label>
                            <div class="form-text">Ilang Aircon ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="airc" id="airc" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Sewing Machine does the household own?</label>
                            <div class="form-text">Ilan ang Sewing Machine ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="sewmach" id="sewmach" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Vehicles  does the household own?</label>
                            <div class="form-text">Ilang Sasakyan ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="car" id="car" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Tricycle/Motorcycle does the household own?</label>
                            <div class="form-text">Ilang Tricycle/Motorcycle ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="motor" id="motor" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Agricultural Land does the household own?</label>
                            <div class="form-text">Ilang Lupang Pang-agrikultura ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="landagri" id="landagri" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Residential Land does the household own?</label>
                            <div class="form-text">Ilang Residential Land ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="landres" id="landres" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Commercial Land does the household own?</label>
                            <div class="form-text">Ilang Commercial Land ang pagmamay-ari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="landcomm" id="landcomm" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Sala/Sofa Set does the household own?</label>
                            <div class="form-text">Ilang Sala/Sofa Set ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="sofa" id="sofa" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">How many Dining Set does the household own?</label>
                            <div class="form-text">Ilang Dining Set ang pag-aari ng sambahayan?</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="dineset" id="dineset" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page4">
            <div id="SectionGarb" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">WASTE MANAGEMENT</h5>
                    <h6 class="card-title-hint"></h6>
                    <div id="SectionGarbMgt" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">What is the system of garbage disposal adopted by the household?</h5>
                            <h6 class="card-title-hint">Anong sistema sa pamamamahala ng basura ang ginagamit ng sambahayan?</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Garbage collection</label>
                                    <div class="form-text">Kinokolekta ang basura</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_collect" id="garb_collect" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="SectionGarbCollect" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Garbage collection details</h5>
                                    <h6 class="card-title-hint">Mga detalye</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Who collects the garbage?</label>
                                            <div class="form-text">Sino ang kumokolekta ng basura?</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <select name="garb_collector" id="garb_collector" class="form-control form-control-sm SectionGarbCollect" required="">
                                                <option></option>
                                                <option value="1">Municipal/city garbage collector</option>
                                                <option value="2">Barangay garbage collector</option>
                                                <option value="3">Private garbage collector</option>
                                                <option value="4">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3 garb_collector_o">
                                        <div class="col-sm-6">
                                            <label class="form-label">Other garbage collector</label>
                                            <div class="form-text">Iba pang kumokolekta</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="garb_collector_o" id="garb_collector_o" type="text" class="form-control form-control-sm " required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">How often is the garbage collected?</label>
                                            <div class="form-text">Gaano kadalas ang pagkokolekta ng basura?</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <select name="freq_garb_coll" id="freq_garb_coll" class="form-control form-control-sm SectionGarbCollect" required="">
                                                <option></option>
                                                <option value="1">Everyday</option>
                                                <option value="2">Thrice a week</option>
                                                <option value="3">Twice a week</option>
                                                <option value="4">Once a week</option>
                                                <option value="5">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3 freq_garb_coll_o">
                                        <div class="col-sm-6">
                                            <label class="form-label">Other frequency of collection</label>
                                            <div class="form-text">Iba pa</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="freq_garb_coll_o" id="freq_garb_coll_o" type="text" class="form-control form-control-sm" required="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Burning</label>
                                    <div class="form-text">Sinusunog</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_burn" id="garb_burn" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Composting</label>
                                    <div class="form-text">Composting</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_comp" id="garb_comp" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Recycling</label>
                                    <div class="form-text">Recycling</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_recycl" id="garb_recycl" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Waste segregation</label>
                                    <div class="form-text">Waste segregation</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_wsegr" id="garb_wsegr" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Pit with cover</label>
                                    <div class="form-text">Hukay na may takip</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_cpit" id="garb_cpit" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Pit without cover</label>
                                    <div class="form-text">Hukay na walang takip</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_opit" id="garb_opit" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Throwing of garbage in river, vacant lot, etc.</label>
                                    <div class="form-text">Nagtatapon ng basura sa ilog, bakanteng lupa, atbp.</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_river" id="garb_river" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Others</label>
                                    <div class="form-text">Iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="garb_mgt_o" id="garb_mgt_o" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 garb_mgt_o_lb">
                                <div class="col-sm-6">
                                    <label class="form-label">What waste management</label>
                                    <div class="form-text">Iba pang pamamaraan ng pamamahala ng basura</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="garb_mgt_o_lb" id="garb_mgt_o_lb" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page5">
            <div id="SectionIncome1" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">SOURCE OF INCOME</h5>
                    <h6 class="card-title-hint"></h6>
                    <div id="SectionIncEA" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">ENTREPRENEURAL ACTIVITIES</h5>
                            <h6 class="card-title-hint">During the past twelve months, did you or any member of your household engage as operator in any of the following entrepreneurial activities to earn income or profit?</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Crop farming and gardening such as growing palay, corn, roots and tubers, vegetables, fruits, nuts, ornamental plants, etc.</label>
                                    <div class="form-text">Pagsasaka at paghahalaman tulad ng pagtatanim ng palay, mais, kamote, gulay, prutas, at iba pang pananim</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="cropind" id="cropind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectioncropind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from crop farming and gardening</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pagsasaka? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="cropincsh" id="cropincsh" type="number" class="form-control form-control-sm Sectioncropind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="cropinknd" id="cropinknd" type="number" class="form-control form-control-sm Sectioncropind" required="">
                                        </div>
                                    </div>
                                    <div class="row crop_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="SectionAgriPage" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">AGRICULTURE</h5>
                                    <h6 class="card-title-hint"></h6>
                                    <div class="row mb-3">
                                        <div>
                                            <label class="form-label">How many agricultural land (parcels) does the household operate</label>
                                            <div class="form-text">Ilang tipak ng lupa ang sinasaka ng sambahayan?</div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-6">
                                                <input name="nalp" id="nalp" type="number" class="form-control form-control-sm SectionAgriPage" required="">
                                            </div>
                                            <div class="col-sm-6">
                                                <div id="add_hpq_alp_btn" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#hpq_alp_modal">
                                                    <i class="bi bi-plus-lg"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="SectionAlp" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">Agricutural Lands</h5>
                                            <h6 class="card-title-hint">Lupang sinasaka</h6>
                                            <div class="table-responsive">
                                                <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Tenure status</th>
                                                            <th>Area</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="hpq_alp_table">
                                                        <!-- Dynamicaly generated html table for hpq_mem --></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div>
                                            <label class="form-label">During the past twelve months, how many types of temporary and permanent crops did your household harvest?</label>
                                            <div class="form-text">Noong nakaraang labindalawang buwan, ilang uri ng pananim ang inyong inani?</div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <input name="ncrop" id="ncrop" type="number" class="form-control form-control-sm SectionAgriPage" required="">
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="add_hpq_crop_btn" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#hpq_crop_modal">
                                                <i class="bi bi-plus-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="SectionCrop" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">Type of crop</h5>
                                            <h6 class="card-title-hint">Uri ng pananim</h6>
                                            <div class="table-responsive">
                                                <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Type of crop</th>
                                                            <th>Vol. of harvest</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="hpq_crop_table">
                                                        <!-- Dynamicaly generated html table for hpq_mem --></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="hpq_agriequip" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">Do you or any member of the household use any of the following agricultural equipment/facilities?</h5>
                                            <h6 class="card-title-hint">Kayo ba o sinumang miyembro ng sambahayan ay gumagamit ng mga sumusunod na kagamitang pang-agrikultura?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Beast of burden</label>
                                                    <div class="form-text">Beast of burden</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip1" id="agriequip1" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip1_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned Beast of burden</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip1_nown" id="agriequip1_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Plow</label>
                                                    <div class="form-text">Plow</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip2" id="agriequip2" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip2_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip2_nown" id="agriequip2_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Harrow</label>
                                                    <div class="form-text">Harrow</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip3" id="agriequip3" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip3_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip3_nown" id="agriequip3_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Mower</label>
                                                    <div class="form-text">Mower</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip4" id="agriequip4" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip4_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip4_nown" id="agriequip4_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Thresher/Corn sheller</label>
                                                    <div class="form-text">Thresher/Corn sheller</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip5" id="agriequip5" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip5_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip5_nown" id="agriequip5_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Insecticide/Pesticide sprayer</label>
                                                    <div class="form-text">Insecticide/Pesticide sprayer</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip6" id="agriequip6" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip6_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip6_nown" id="agriequip6_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Farm tractor</label>
                                                    <div class="form-text">Farm tractor</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip7" id="agriequip7" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip7_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip7_nown" id="agriequip7_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Hand tractor</label>
                                                    <div class="form-text">Hand tractor</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip8" id="agriequip8" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip8_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip8_nown" id="agriequip8_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Turtle/Mudboat</label>
                                                    <div class="form-text">Turtle/Mudboat</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip9" id="agriequip9" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip9_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip9_nown" id="agriequip9_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Planter/Transplanter/Dryer</label>
                                                    <div class="form-text">Planter/Transplanter/Dryer</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip10" id="agriequip10" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip10_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip10_nown" id="agriequip10_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Mechanical Dryer</label>
                                                    <div class="form-text">Mechanical Dryer</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip11" id="agriequip11" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip11_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip11_nown" id="agriequip11_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Multipurpose drying pavement</label>
                                                    <div class="form-text">Multipurpose drying pavement</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip12" id="agriequip12" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip12_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip12_nown" id="agriequip12_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Rice/Corn/Feed mill</label>
                                                    <div class="form-text">Rice/Corn/Feed mill</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip13" id="agriequip13" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip13_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip13_nown" id="agriequip13_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Harvester</label>
                                                    <div class="form-text">Harvester</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip14" id="agriequip14" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip14_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip14_nown" id="agriequip14_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Warehouse granary</label>
                                                    <div class="form-text">Warehouse granary</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip15" id="agriequip15" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip15_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip15_nown" id="agriequip15_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Farmshed</label>
                                                    <div class="form-text">Farmshed</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip16" id="agriequip16" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip16_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip16_nown" id="agriequip16_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Irrigation pump</label>
                                                    <div class="form-text">Irrigation pump</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip17" id="agriequip17" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip17_nown">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip17_nown" id="agriequip17_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Others</label>
                                                    <div class="form-text">Iba pa</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="agriequip18" id="agriequip18" class="form-control form-control-sm SectionAgriPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip18_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Other equipment</label>
                                                    <div class="form-text">Iba pang uri ng kagamitan</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip18_o" id="agriequip18_o" type="text" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3 agriequip18_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">No. of owned</label>
                                                    <div class="form-text">Ilan ang pag-aari</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="agriequip18_nown" id="agriequip18_nown" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Livestock and poultry raising such as raising of carabaos, cattle, hogs, horses, chicken, ducks, etc., and the production of fresh milk, eggs, etc.</label>
                                    <div class="form-text">Pag-aalaga ng mga hayop katulad ng kalabaw, baka, baboy, kambing, manok, bibe at iba pa. Kasama sa gawaing ito ang pagkuha ng gatas mula sa kalabaw, baka at kambing at pagkuha ng itlog mula sa manok, bibe at pugo at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="poultind" id="poultind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionpoultind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from livestock/poultry</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pag-aalaga ng hayop? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="pouincsh" id="pouincsh" type="number" class="form-control form-control-sm Sectionpoultind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="pouinknd" id="pouinknd" type="number" class="form-control form-control-sm Sectionpoultind" required="">
                                        </div>
                                    </div>
                                    <div class="row poul_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="LivestockPage" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">LIVESTOCK</h5>
                                    <h6 class="card-title-hint"></h6>
                                    <div id="hpq_liveanimals" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">For the past twelve months, which livestock or poultry was raised and provided the following products?</h5>
                                            <h6 class="card-title-hint">Noong nakaraang labindalawang buwan, anu-ano ang mga hayop na nagbigay ng produkto?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Hog/Sow</label>
                                                    <div class="form-text">Baboy</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_hog" id="live_a_hog" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_hog_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of Hog/Sow</label>
                                                    <div class="form-text">Dami ng baboy</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_hog_vol" id="live_a_hog_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Goat</label>
                                                    <div class="form-text">Kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_goat" id="live_a_goat" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_goat_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of goat</label>
                                                    <div class="form-text">Dami ng kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_goat_vol" id="live_a_goat_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Carabao</label>
                                                    <div class="form-text">Kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_carabao" id="live_a_carabao" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_carabao_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of carabao</label>
                                                    <div class="form-text">Dami ng kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_carabao_vol" id="live_a_carabao_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Cow</label>
                                                    <div class="form-text">Baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_cow" id="live_a_cow" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_cow_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of cow</label>
                                                    <div class="form-text">Dami ng baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_cow_vol" id="live_a_cow_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Chicken</label>
                                                    <div class="form-text">Manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_chicken" id="live_a_chicken" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_chicken_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of chicken</label>
                                                    <div class="form-text">Dami ng manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_chicken_vol" id="live_a_chicken_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Duck</label>
                                                    <div class="form-text">Itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_duck" id="live_a_duck" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_duck_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of duck</label>
                                                    <div class="form-text">Dami ng itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_duck_vol" id="live_a_duck_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Others</label>
                                                    <div class="form-text">Iba pa</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="live_a_others" id="live_a_others" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Other type of animal</label>
                                                    <div class="form-text">Iba pang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_others_o" id="live_a_others_o" type="text" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3 live_a_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity</label>
                                                    <div class="form-text">Dami</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="live_a_others_vol" id="live_a_others_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="hpq_meat" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">For the past twelve months, which livestock or poultry was raised and provided meat?</h5>
                                            <h6 class="card-title-hint">Noong nakaraang labindalawang buwan, anu-ano ang mga hayop na nagbigay ng karne?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Hog/Sow</label>
                                                    <div class="form-text">Baboy</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_hog" id="meat_hog" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_hog_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from hog/sow</label>
                                                    <div class="form-text">Timbang ng baboy</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_hog_vol" id="meat_hog_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Goat</label>
                                                    <div class="form-text">Kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_goat" id="meat_goat" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_goat_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from goat</label>
                                                    <div class="form-text">Timbang ng kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_goat_vol" id="meat_goat_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Carabao</label>
                                                    <div class="form-text">Kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_carabao" id="meat_carabao" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_carabao_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from carabao</label>
                                                    <div class="form-text">Timbang ng kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_carabao_vol" id="meat_carabao_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Cow</label>
                                                    <div class="form-text">Baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_cow" id="meat_cow" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_cow_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from cow</label>
                                                    <div class="form-text">Timbang ng baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_cow_vol" id="meat_cow_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Chicken</label>
                                                    <div class="form-text">Manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_chicken" id="meat_chicken" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_chicken_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from chicken</label>
                                                    <div class="form-text">Timbang ng manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_chicken_vol" id="meat_chicken_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Duck</label>
                                                    <div class="form-text">Itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_duck" id="meat_duck" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_duck_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat from duck</label>
                                                    <div class="form-text">Timbang ng itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_duck_vol" id="meat_duck_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Others</label>
                                                    <div class="form-text">Iba pa</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="meat_others" id="meat_others" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Other type of animal</label>
                                                    <div class="form-text">Iba pang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_others_o" id="meat_others_o" type="text" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3 meat_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of meat</label>
                                                    <div class="form-text">Timbang ng karne</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="meat_others_vol" id="meat_others_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="hpq_milk" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">For the past twelve months, which livestock or poultry was raised and provided milk?</h5>
                                            <h6 class="card-title-hint">Noong nakaraang labindalawang buwan, anu-ano ang mga hayop na nagbigay ng gatas?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Goat</label>
                                                    <div class="form-text">Kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="milk_goat" id="milk_goat" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 milk_goat_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of milk from goat</label>
                                                    <div class="form-text">Dami ng litro ng gatas mula sa kambing</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="milk_goat_vol" id="milk_goat_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Carabao</label>
                                                    <div class="form-text">Kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="milk_carabao" id="milk_carabao" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 milk_carabao_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of milk from carabao</label>
                                                    <div class="form-text">Dami ng litro ng gatas mula sa kalabaw</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="milk_carabao_vol" id="milk_carabao_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Cow</label>
                                                    <div class="form-text">Baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="milk_cow" id="milk_cow" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 milk_cow_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of milk from cow</label>
                                                    <div class="form-text">Dami ng litro ng gatas mula sa baka</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="milk_cow_vol" id="milk_cow_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Others</label>
                                                    <div class="form-text">Iba pa</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="milk_others" id="milk_others" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 milk_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Other type</label>
                                                    <div class="form-text">Iba pang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="milk_others_o" id="milk_others_o" type="text" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3 milk_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Volume of milk from other type</label>
                                                    <div class="form-text">Dami ng litro ng gatas mula iba pang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="milk_others_o_vol" id="milk_others_o_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="hpq_eggs" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">For the past twelve months, which livestock or poultry was raised and provided eggs?</h5>
                                            <h6 class="card-title-hint">Noong nakaraang labindalawang buwan, anu-ano ang mga hayop na nagbigay ng itlog?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Chicken</label>
                                                    <div class="form-text">Manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="egg_chicken" id="egg_chicken" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 egg_chicken_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of eggs from chicken</label>
                                                    <div class="form-text">Dami ng itlog mula sa manok</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="egg_chicken_vol" id="egg_chicken_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Duck</label>
                                                    <div class="form-text">Itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="egg_duck" id="egg_duck" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 egg_duck_vol">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of egss from duck</label>
                                                    <div class="form-text">Dami ng itlog mula sa itik</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="egg_duck_vol" id="egg_duck_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Others</label>
                                                    <div class="form-text">Iba pa</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="egg_others" id="egg_others" class="form-control form-control-sm LivestockPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 egg_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Other type of animal</label>
                                                    <div class="form-text">Iba pang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="egg_others_o" id="egg_others_o" type="" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                            <div class="row mb-3 egg_others_o">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Quantity of eggs from other type of animal</label>
                                                    <div class="form-text">Dami ng itlog mula sa ibang uri ng hayop</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input name="egg_others_vol" id="egg_others_vol" type="number" class="form-control form-control-sm" required="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Fishing activities such as capture of fish; gathering of fry, shells, seaweeds, etc.; culturing fish, oyster, mussel, etc.</label>
                                    <div class="form-text">Pangingisda o panghuhuli ng isda at iba pang yamang tubig tulad ng tahong, suso, talaba, seaweeds, at iba pa. Kasama din dito ang pag-aalaga ng yamang-tubig katulad ng bangus, tilapia, talaba, tahong at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="fishind" id="fishind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionfishind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from fishing</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pangingisda? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="fishincsh" id="fishincsh" type="number" class="form-control form-control-sm Sectionfishind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="fishinknd" id="fishinknd" type="number" class="form-control form-control-sm Sectionfishind" required="">
                                        </div>
                                    </div>
                                    <div class="row fish_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="FishPage" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">FISHING</h5>
                                    <h6 class="card-title-hint"></h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Is the household engaged in catching /gathering fish, crabs, shrimps, etc.?</label>
                                            <div class="form-text">Ang sambahayan ba ay nanghuhuli ng isda, alimango, hipon at iba pa?</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <select name="catch_fish" id="catch_fish" class="form-control form-control-sm FishPage" required="">
                                                <option></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Is the household engaged in culturing fish, seeweeds, etc.?</label>
                                            <div class="form-text">Ang sambahayan ba ay nag-aalaga ng isda, alimango, hipon at iba pa?</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <select name="cul_fish" id="cul_fish" class="form-control form-control-sm FishPage" required="">
                                                <option></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Where did household/s member/s perform fishing operation in the last 12 months?</label>
                                            <div class="form-text">Saan nangingisda ang sambahayan sa nakalipas na 12 buwan?</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <select name="catch_fish_loc" id="catch_fish_loc" class="form-control form-control-sm" required="">
                                                <option></option>
                                                <option value="1">Marine waters</option>
                                                <option value="2">Inland waters</option>
                                                <option value="3">Both</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="SectionFishingBoat" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">Does the household have boat/vessel used in fishing operation</h5>
                                            <h6 class="card-title-hint">Mayroon ba kayong bangka na ginagamit sa pangingisda?</h6>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Boat with engine and outrigger</label>
                                                    <div class="form-text">Boat with engine and outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat1" id="boat1" class="form-control form-control-sm FishPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 boat1_own">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Does the household own boat with engine and outrigger</label>
                                                    <div class="form-text">Pag-aari ba ng sambahayan ang boat with engine and outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat1_own" id="boat1_own" class="form-control form-control-sm" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Boat with engine but without outrigger</label>
                                                    <div class="form-text">Boat with engine but without outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat2" id="boat2" class="form-control form-control-sm FishPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 boat2_own">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Does the household own boat with engine but without outrigger</label>
                                                    <div class="form-text">Pag-aari ba ng sambahayan ang boat with engine but without outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat2_own" id="boat2_own" class="form-control form-control-sm" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Boat without engine but with outrigger</label>
                                                    <div class="form-text">Boat without engine but with outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat3" id="boat3" class="form-control form-control-sm FishPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 boat3_own">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Does the household own boat without engine but with outrigger</label>
                                                    <div class="form-text">Pag-aari ba ng sambahayan ang boat without engine but with outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat3_own" id="boat3_own" class="form-control form-control-sm" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Boat without engine and outrigger</label>
                                                    <div class="form-text">Boat without engine and outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat4" id="boat4" class="form-control form-control-sm FishPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 boat4_own">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Does the household own boat without engine and outrigger</label>
                                                    <div class="form-text">Pag-aari ba ng sambahayan ang boat without engine and outrigger</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat4_own" id="boat4_own" class="form-control form-control-sm" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Raft</label>
                                                    <div class="form-text">Raft</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat5" id="boat5" class="form-control form-control-sm FishPage" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3 boat5_own">
                                                <div class="col-sm-6">
                                                    <label class="form-label">Does the household own raft</label>
                                                    <div class="form-text">Pag-aari ba ng sambahayan ang raft</div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <select name="boat5_own" id="boat5_own" class="form-control form-control-sm" required="">
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="SectionAquaEquip" class="card mb-3 p-1">
                                        <div class="card-body">
                                            <h5 class="card-title-label">Gears/accessories/devices was/were used for fishing</h5>
                                            <h6 class="card-title-hint"></h6>
                                            <div class="row mb-3">
                                                <div>
                                                    <label class="form-label">How many type of of gears/accessories/devices was/were used for fishing?</label>
                                                    <div class="form-text">Ilang uri ng kagamitang pangingisda ang ginamit?</div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-6">
                                                        <input name="naquaequip" id="naquaequip" type="number" class="form-control form-control-sm FishPage" required="">
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div id="add_hpq_aquaequip_btn" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#hpq_aquaequip_modal">
                                                            <i class="bi bi-plus-lg"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="aquaequip" class="card mb-3 p-1">
                                                <div class="card-body">
                                                    <h5 class="card-title-label"></h5>
                                                    <h6 class="card-title-hint"></h6>
                                                    <div class="table-responsive">
                                                        <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Type of equipment</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="hpq_aquaequip_table">
                                                                <!-- Dynamicaly generated html table for hpq_mem --></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="SectionAquaFarm" class="card mb-3 p-1">
                                                <div class="card-body">
                                                    <h5 class="card-title-label">What type of farm did the household operate?</h5>
                                                    <h6 class="card-title-hint">Anong uri ng palaisdaan ang inoperate ng sambahayan?</h6>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Fishpond</label>
                                                            <div class="form-text">Fishpond</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="fishpond" id="fishpond" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Fish pen</label>
                                                            <div class="form-text">Fish pen</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="fishpen" id="fishpen" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Fish cage</label>
                                                            <div class="form-text">Fish cage</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="fishcage" id="fishcage" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Seaweed farm</label>
                                                            <div class="form-text">Seaweed farm</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="seaweedfarm" id="seaweedfarm" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Oyster farm</label>
                                                            <div class="form-text">Oyster farm</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="oysterfarm" id="oysterfarm" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Mussel farm</label>
                                                            <div class="form-text">Mussel farm</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="musselfarm" id="musselfarm" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Fish tank</label>
                                                            <div class="form-text">Fish tank</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="fishtank" id="fishtank" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Hatchery</label>
                                                            <div class="form-text">Hatchery</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="hatchery" id="hatchery" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Others</label>
                                                            <div class="form-text">Iba pa</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select name="aquafarm_o" id="aquafarm_o" class="form-control form-control-sm FishPage" required="">
                                                                <option></option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3 aquafarm_o_txt">
                                                        <div class="col-sm-6">
                                                            <label class="form-label">Other type of farm</label>
                                                            <div class="form-text">Iba pang uri ng palaisdaan</div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <input name="aquafarm_o_txt" id="aquafarm_o_txt" type="text" class="form-control form-control-sm" required="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div>
                                                    <label class="form-label">For the past twelve months, how many type of fish or aquatic animal was cultured or caught by your household?</label>
                                                    <div class="form-text">Noong nakaraang labindalawang buwan, ilang uri ng isda o iba pang yamang-tubig ang hinuli o inalagaan ng sambahayan?</div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-6">
                                                        <input name="naquani" id="naquani" type="number" class="form-control form-control-sm FishPage" required="">
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div id="add_hpq_aquani_btn" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#hpq_aquani_modal">
                                                            <i class="bi bi-plus-lg"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="SectionAquani" class="card mb-3 p-1">
                                                <div class="card-body">
                                                    <h5 class="card-title-label">Fish and aquatic animals cultured and caught</h5>
                                                    <h6 class="card-title-hint">Isda at mga yamang tubig na inalagaan at nahuli</h6>
                                                    <div class="table-responsive">
                                                        <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                                            <thead>
                                                                <tr>
                                                                    <th>Agricutural Land</th>
                                                                    <th>Area</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="hpq_aquani_table">
                                                                <!-- Dynamicaly generated html table for hpq_mem --></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Forestry and hunting activities such as tree planting (falcata, gmelina, rubber trees, etc.), firewood gathering, small-scale logging, charcoal making, gathering of forestry product (cogon, nipa, rattan, bamboo, resin, gum, etc.) or hunting of wild animals.</label>
                                    <div class="form-text">Pangangahoy at pangangaso, tulad ng pagtatanim ng puno, pagkuha ng panggatong, pagkuha ng mga produktong mula sa gubat gaya ng kahoy, cogon, nipa, rattan, kawayan at iba pa o panghuhuli ng mga hayop tulad ng usa, baboy-ramo, mga ibon at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="forind" id="forind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionforind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from forestry</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pangangangahoy at pangangaso? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="forincsh" id="forincsh" type="number" class="form-control form-control-sm Sectionforind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="forinknd" id="forinknd" type="number" class="form-control form-control-sm Sectionforind" required="">
                                        </div>
                                    </div>
                                    <div class="row for_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Wholesale and retail trade including market vending, sidewalk vending and peddling, etc.</label>
                                    <div class="form-text">Pagtitinda o pangangalakal ng anumang produkto (wholesale o retail). Kasama dito ang pagtitinda sa palengke, lansangan, malls, bahay-bahay at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="salind" id="salind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionsalind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from wholesale/retail</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pagtitinda o pangangalakal? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="salincsh" id="salincsh" type="number" class="form-control form-control-sm Sectionsalind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="salinknd" id="salinknd" type="number" class="form-control form-control-sm Sectionsalind" required="">
                                        </div>
                                    </div>
                                    <div class="row sal_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Manufacturing activities such as mat weaving, tailoring, dressmaking, bagoong making, fish drying, etc.</label>
                                    <div class="form-text">Paggawa ng produkto tulad ng basahan, damit, tsinelas, bagoong, tuyo at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="manind" id="manind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionmanind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from manufacturing</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa paggawa ng produkto? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="manincsh" id="manincsh" type="number" class="form-control form-control-sm Sectionmanind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="maninknd" id="maninknd" type="number" class="form-control form-control-sm Sectionmanind" required="">
                                        </div>
                                    </div>
                                    <div class="row man_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Community, social and personal services such as medical and dental practice, practice of trade, operation of school, restaurants and hotels, etc.</label>
                                    <div class="form-text">Mga serbisyong pantao o pangbayan tulad ng serbisyong pangkalusugan, "dental", pamamalakad ng paaralan, "restaurants", "hotel" at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="servind" id="servind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionservind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from community, social &amp; personal service</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa mga serbisyong pantao/pambayan? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="servincsh" id="servincsh" type="number" class="form-control form-control-sm Sectionservind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="servinknd" id="servinknd" type="number" class="form-control form-control-sm Sectionservind" required="">
                                        </div>
                                    </div>
                                    <div class="row serv_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Transportation, storage and communication service such as operation of jeepneys or taxis, storage and warehousing activities, messengerial services, etc.</label>
                                    <div class="form-text">Serbisyo sa transportasyon at komunikasyon. Halimbawa nito ay pagpapasada ng dyipni, traysikel, taxi, "messenger" at "postal service". Kasama din dito ang mga negosyong nagbibigay ng serbisyong pagtatago at pag-iimbak ng produkto</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="trnind" id="trnind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectiontrnind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from transportation, storage &amp; communication</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa serbisyo sa transportasyon at komunikasyon? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="trnincsh" id="trnincsh" type="number" class="form-control form-control-sm Sectiontrnind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="trninknd" id="trninknd" type="number" class="form-control form-control-sm Sectiontrnind" required="">
                                        </div>
                                    </div>
                                    <div class="row trn_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Mining and quarrying activities such as mineral extraction like salt making, gold mining, gravel, sand and stone quarrying, etc.</label>
                                    <div class="form-text">Pagmimina ng graba, buhangin, bakal, ginto at iba pang mahahalagang bato. Kasama din dito ang paggawa ng asin (salt extraction), pagtitibag, at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="minind" id="minind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectionminind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from mining &amp; quarrying</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa pagmimina? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="minincsh" id="minincsh" type="number" class="form-control form-control-sm Sectionminind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="mininknd" id="mininknd" type="number" class="form-control form-control-sm Sectionminind" required="">
                                        </div>
                                    </div>
                                    <div class="row min_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Construction like repair of house, building or any structure</label>
                                    <div class="form-text">Konstruksyon tulad ng paggawa at pagkumpuni ng bahay, gusali, tulay at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="cnsind" id="cnsind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectioncnsind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from construction</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa konstruksyon? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="cnsincsh" id="cnsincsh" type="number" class="form-control form-control-sm Sectioncnsind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="cnsinknd" id="cnsinknd" type="number" class="form-control form-control-sm Sectioncnsind" required="">
                                        </div>
                                    </div>
                                    <div class="row cns_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Activities not elsewhere classified, including electricity, gas and water, financing, insurance, real estate and business services NEC</label>
                                    <div class="form-text">Mga gawaing pangkabuhayan na hindi kahalintulad sa mga nabanggit, tulad ng serbisyo sa kuryente, gaas at tubig, mga negosyo ukol sa pinansyal tulad ng real estate, insurance at iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="eothind" id="eothind" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div id="Sectioneothind" class="card mb-3 p-1">
                                <div class="card-body">
                                    <h5 class="card-title-label">Income from other activities nec</h5>
                                    <h6 class="card-title-hint">Magkano ang kabuuang netong kita sa iba pang gawaing pangkabuhayan? (Sa Piso)</h6>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Cash</label>
                                            <div class="form-text">Sa salapi</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="eoincsh" id="eoincsh" type="number" class="form-control form-control-sm Sectioneothind" required="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Kind</label>
                                            <div class="form-text">Sa bagay</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <input name="eoinknd" id="eoinknd" type="number" class="form-control form-control-sm Sectioneothind" required="">
                                        </div>
                                    </div>
                                    <div class="row eoth_income_msg">
                                        <div class="alert alert-info" role="alert">
                                            INFO: INCOME MUST NOT BE LESS THAN 300
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionTotinEA" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Total income from entrepreneurial activities</h5>
                            <h6 class="card-title-hint">Kabuuang kita sa gawaing pangkabuhayan</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="etotcsh" id="etotcsh" type="number" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="etotknd" id="etotknd" type="number" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionIncome2" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">SOURCE OF INCOME (contd.)</h5>
                    <h6 class="card-title-hint"></h6>
                    <div id="SectionIncWage" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">SALARIES AND WAGES</h5>
                            <h6 class="card-title-hint">SAHOD/SWELDO MULA SA PINAPASUKANG TRABAHO</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="wagcsh" id="wagcsh" type="number" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="wagknd" id="wagknd" type="number" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionIncOS" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">OTHER SOURCES OF INCOME</h5>
                    <h6 class="card-title-hint">IBA PANG PINAGKUKUNAN NG KITA</h6>
                    <div id="SectionIncOSags" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Net share of crops</h5>
                            <h6 class="card-title-hint">Bahaging produksyon katulad ng ani na pananim (hal. palay, gulay at prutas) at mga hayop (hal. baka, manok, at iba pa) na pinaalagaan sa ibang sambahayan.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="agscsh" id="agscsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="agsknd" id="agsknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSofw" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Remittances from Overseas Filipino Workers</h5>
                            <h6 class="card-title-hint">Suporta galing sa mga kamag-anak na nasa ibang bansa o Overseas Filipino Workers (OFW).</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="ofwcsh" id="ofwcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="ofwknd" id="ofwknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSsupf" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Other cash receipts, gift, support, relief and other income from abroad including pensions, retirement, workmen's compensation, dividends from investments, etc.</h5>
                            <h6 class="card-title-hint">Iba pang suporta galing sa ibang bansa, katulad ng pensyon, benepisyo, kita mula sa puhunan sa negosyo, tulong pinansyal o regalong natanggap mula sa mga institusyon na nasa ibang bansa.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="supfcsh" id="supfcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="supfknd" id="supfknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSsupr" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Cash receipts, support, assistance, relief and other income from domestic sources, including assistance from government and private sources</h5>
                            <h6 class="card-title-hint">Suporta o tulong pinansyal galing sa mga kamag-anak, pamahalaan o pribadong institusyon dito sa bansa.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="suprcsh" id="suprcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="suprknd" id="suprknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSrentv" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Rentals received from non-agricultural lands, buildings, spaces and other properties</h5>
                            <h6 class="card-title-hint">Bayad galing sa pinauupahang lupa, gusali at iba pang ari-arian. Hindi kasama dito ang mga lupain na ginagamit sa agrikultura (agricultural land).</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="rentvcsh" id="rentvcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="rentvknd" id="rentvknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSintr" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Interest from bank deposits, interest from loans extended to other families.</h5>
                            <h6 class="card-title-hint">Mga interes o tubo galing sa perang nakaimpok sa bangko at mga pautang sa ibang tao o sambahayan.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="intrcsh" id="intrcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="intrknd" id="intrknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSpen" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Pension and retirement, workmen's compensation and social security benefits</h5>
                            <h6 class="card-title-hint">Pensyon, benepisyo mula sa pagreretiro, at "social security benefits".</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="pencsh" id="pencsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="penknd" id="penknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSdiv" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Dividends from investments</h5>
                            <h6 class="card-title-hint">Dibidendo o mga kita sa mga pinamuhunan sa ibang negosyo.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="divcsh" id="divcsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="divknd" id="divknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionIncOSoths" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Other sources of income not elsewhere classified</h5>
                            <h6 class="card-title-hint">Iba pang kita na hindi kasama sa mga nabanggit.</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="othscsh" id="othscsh" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="othsknd" id="othsknd" type="number" value="0" min="0" class="form-control form-control-sm" required="required">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SectionTotinOS" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Total income from other sources</h5>
                            <h6 class="card-title-hint">Kabuuang kita mula sa iba pang pinagkukunan</h6>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Cash</label>
                                    <div class="form-text">Sa salapi</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="othstotcsh" id="othstotcsh" type="number" value="0" min="0" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <label class="form-label">Kind</label>
                                    <div class="form-text">Sa bagay</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="othstotknd" id="othstotknd" type="number" value="0" min="0" class="form-control form-control-sm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionTotin" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">Total</h5>
                    <h6 class="card-title-hint">Kabuuan</h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Total imputed rent</label>
                            <div class="form-text">Kabuuang tantyang upa</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="imprnttot" id="imprnttot" type="number" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Total income (cash)</label>
                            <div class="form-text">Kabuuang kita (salapi)</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="totincsh" id="totincsh" type="number" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Total income (kind)</label>
                            <div class="form-text">Kabuuang kita (bagay)</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="totinknd" id="totinknd" type="number" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Total household income</label>
                            <div class="form-text">Kabuuang kita</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="totin" id="totin" type="number" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page6">
            <div id="ClimateChangePage" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">CLIMATE CHANGE</h5>
                    <h6 class="card-title-hint"></h6>
                    <div id="hpq_calam" class="card mb-3 p-1 ClimateChangePage">
                        <div class="card-body">
                            <h5 class="card-title-label">CALAMITY  During the past 12 months, which of the following calamities affected your household</h5>
                            <h6 class="card-title-hint">Noong nakaraang 12 buwan, kayo ba ay nasalanta ng alinman sa mga sumusunod</h6>
                            <div class="row mb-3 calam1">
                                <div class="col-sm-6">
                                    <label class="form-label"> Typhoon</label>
                                    <div class="form-text"> Bagyo</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam1" id="calam1" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam1_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for typhoon?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang bagyo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam1_aid" id="calam1_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam1_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Typhoon come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang bagyo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam1_hus_aid" id="calam1_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam1_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Typhoon</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang bagyo</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam1_hus_aid_o" id="calam1_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam2">
                                <div class="col-sm-6">
                                    <label class="form-label"> Flood</label>
                                    <div class="form-text"> Baha</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam2" id="calam2" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam2_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for typhoon?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang bagyo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam2_aid" id="calam2_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam2_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Typhoon come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang bagyo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam2_hus_aid" id="calam2_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam2_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Typhoon</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang bagyo</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam2_hus_aid_o" id="calam2_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam3">
                                <div class="col-sm-6">
                                    <label class="form-label"> Drought</label>
                                    <div class="form-text"> Tagtuyot</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam3" id="calam3" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam3_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for drought?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang tagtuyot?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam3_aid" id="calam3_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam3_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for drought come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang tagtuyot?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam3_hus_aid" id="calam3_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam3_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for drought</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang tagtuyot</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam3_hus_aid_o" id="calam3_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam4">
                                <div class="col-sm-6">
                                    <label class="form-label"> Earthquake</label>
                                    <div class="form-text"> Lindol</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam4" id="calam4" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam4_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Earthquake?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang tagtuyot?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam4_aid" id="calam4_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam4_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Earthquake come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang tagtuyot?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam4_hus_aid" id="calam4_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam4_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Earthquake</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang tagtuyot</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam4_hus_aid_o" id="calam4_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam5">
                                <div class="col-sm-6">
                                    <label class="form-label"> Volcanic eruption</label>
                                    <div class="form-text"> Pagsabog ng bulkan</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam5" id="calam5" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam5_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Volcanic eruption?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Pagsabog ng bulkan?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam5_aid" id="calam5_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam5_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Volcanic eruption come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Pagsabog ng bulkan?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam5_hus_aid" id="calam5_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam5_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Volcanic eruption</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Pagsabog ng bulkan</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam5_hus_aid_o" id="calam5_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam6">
                                <div class="col-sm-6">
                                    <label class="form-label"> Landslide</label>
                                    <div class="form-text"> Pagguho ng lupa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam6" id="calam6" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam6_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Landslide?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Pagguho ng lupa?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam6_aid" id="calam6_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam6_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Landslide come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Pagguho ng lupa?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam6_hus_aid" id="calam6_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam6_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Landslide</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Pagguho ng lupa</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam6_hus_aid_o" id="calam6_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam7">
                                <div class="col-sm-6">
                                    <label class="form-label"> Tsunami</label>
                                    <div class="form-text"> Tsunami</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam7" id="calam7" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam7_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Tsunami?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Tsunami?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam7_aid" id="calam7_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam7_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Tsunami come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Tsunami?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam7_hus_aid" id="calam7_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam7_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Tsunami</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Tsunami</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam7_hus_aid_o" id="calam7_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam8">
                                <div class="col-sm-6">
                                    <label class="form-label"> Fire</label>
                                    <div class="form-text"> Sunog</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam8" id="calam8" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam8_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Fire?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Sunog?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam8_aid" id="calam8_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam8_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Fire come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Sunog?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam8_hus_aid" id="calam8_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam8_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Fire</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Sunog</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam8_hus_aid_o" id="calam8_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam9">
                                <div class="col-sm-6">
                                    <label class="form-label"> Forest fire</label>
                                    <div class="form-text"> Forest fire</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam9" id="calam9" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam9_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Forest fire?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Forest fire?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam9_aid" id="calam9_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam9_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Forest fire come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Forest fire?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam9_hus_aid" id="calam9_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam9_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Forest fire</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Forest fire</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam9_hus_aid_o" id="calam9_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam10">
                                <div class="col-sm-6">
                                    <label class="form-label"> Armed  Conflict</label>
                                    <div class="form-text"> Armadong digmaan</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam10" id="calam10" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam10_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance for Armed  Conflict?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong sa nagdaang Armadong digmaan?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam10_aid" id="calam10_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam10_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid for Armed  Conflict come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong para sa nagdaang Armadong digmaan?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam10_hus_aid" id="calam10_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam10_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid for Armed  Conflict</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong para sa nagdaang Armadong digmaan</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam10_hus_aid_o" id="calam10_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 calam11">
                                <div class="col-sm-6">
                                    <label class="form-label"> Others</label>
                                    <div class="form-text"> Iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam11" id="calam11" class="form-control form-control-sm" required="required">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam11_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Did you receive any kind of assistance?</label>
                                    <div class="form-text"> Kayo ba ay nakatanggap ng anumang tulong?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam11_aid" id="calam11_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam11_hus_aid">
                                <div class="col-sm-6">
                                    <label class="form-label"> Where did the of aid  come from?</label>
                                    <div class="form-text"> Saan nanggaling ang tulong?</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="calam11_hus_aid" id="calam11_hus_aid" class="form-control form-control-sm" required="">
                                        <option></option>
                                        <option value="1">Government</option>
                                        <option value="2">NGO</option>
                                        <option value="3">Relatives</option>
                                        <option value="4">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 calam11_hus_aid_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Other source of aid</label>
                                    <div class="form-text"> Iba pang pinanggalingan ng tulong?</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="calam11_hus_aid_o" id="calam11_hus_aid_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionDisasPrep" class="card mb-3 p-1 ClimateChangePage">
                <div class="card-body">
                    <h5 class="card-title-label">DISASTER PREPAREDNESS</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3 disas_prep">
                        <div class="col-sm-6">
                            <label class="form-label"> Do you have a disaster preparedness kit?</label>
                            <div class="form-text"> Mayroon ba kayong disaster preparedness kit?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="disas_prep" id="disas_prep" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div id="hpq_dpkit" class="card mb-3 p-1">
                        <div class="card-body">
                            <h5 class="card-title-label">Do you have the following in your disaster preparedness kit?</h5>
                            <h6 class="card-title-hint">Alin sa mga sumusunod ang laman ng inyong disaster preparedness kit?</h6>
                            <div class="row mb-3 dp_kit1">
                                <div class="col-sm-6">
                                    <label class="form-label"> Water</label>
                                    <div class="form-text"> Tubig</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit1" id="dp_kit1" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit1_xpiry">
                                <div class="col-sm-6">
                                    <label class="form-label"> How many days would water last?</label>
                                    <div class="form-text"> Pang-ilang araw na konsumo ang tubig?</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="dp_kit1_xpiry" id="dp_kit1_xpiry" type="number" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit2">
                                <div class="col-sm-6">
                                    <label class="form-label"> Food (canned goods, biscuit, bread)</label>
                                    <div class="form-text"> Pagkain (de lata, biskwit, tinapay)</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit2" id="dp_kit2" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit2_xpiry">
                                <div class="col-sm-6">
                                    <label class="form-label"> How many days would food (canned goods, biscuit, bread) last?</label>
                                    <div class="form-text"> Pang-ilang araw na konsumo ang Pagkain?</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="dp_kit2_xpiry" id="dp_kit2_xpiry" type="number" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit3">
                                <div class="col-sm-6">
                                    <label class="form-label"> Matches/Lighter</label>
                                    <div class="form-text"> Posporo/Lighter</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit3" id="dp_kit3" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit4">
                                <div class="col-sm-6">
                                    <label class="form-label"> Flashlight/Emergency Light</label>
                                    <div class="form-text"> Flashlight/Emergency Light</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit4" id="dp_kit4" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit5">
                                <div class="col-sm-6">
                                    <label class="form-label"> Radio/Transistor</label>
                                    <div class="form-text"> Radyong de baterya</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit5" id="dp_kit5" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit6">
                                <div class="col-sm-6">
                                    <label class="form-label"> Candle</label>
                                    <div class="form-text"> Kandila</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit6" id="dp_kit6" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit7">
                                <div class="col-sm-6">
                                    <label class="form-label"> Medical Kit</label>
                                    <div class="form-text"> Medical Kit</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit7" id="dp_kit7" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit8">
                                <div class="col-sm-6">
                                    <label class="form-label"> Whistle</label>
                                    <div class="form-text"> Pito</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit8" id="dp_kit8" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit9">
                                <div class="col-sm-6">
                                    <label class="form-label"> Clothes</label>
                                    <div class="form-text"> Damit</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit9" id="dp_kit9" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit10">
                                <div class="col-sm-6">
                                    <label class="form-label"> Blanket</label>
                                    <div class="form-text"> Kumot</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit10" id="dp_kit10" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit11">
                                <div class="col-sm-6">
                                    <label class="form-label"> Battery</label>
                                    <div class="form-text"> Baterya</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit11" id="dp_kit11" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit12">
                                <div class="col-sm-6">
                                    <label class="form-label"> Important Documents</label>
                                    <div class="form-text"> Mahalagang dokumento</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit12" id="dp_kit12" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit13">
                                <div class="col-sm-6">
                                    <label class="form-label"> Others</label>
                                    <div class="form-text"> Iba pa</div>
                                </div>
                                <div class="col-sm-6">
                                    <select name="dp_kit13" id="dp_kit13" class="form-control form-control-sm hpq_dpkit" required="">
                                        <option></option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit13_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> Specify</label>
                                    <div class="form-text"> Itala</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="dp_kit13_o" id="dp_kit13_o" type="text" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                            <div class="row mb-3 dp_kit13_o">
                                <div class="col-sm-6">
                                    <label class="form-label"> How many days would it last?</label>
                                    <div class="form-text"> Pang ilang araw na konsumo?</div>
                                </div>
                                <div class="col-sm-6">
                                    <input name="dp_kit13_xpiry" id="dp_kit13_xpiry" type="number" class="form-control form-control-sm" required="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page7">
            <div id="SectionFShort" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title-label">HUNGER</h5>
                    <h6 class="card-title-hint"></h6>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">In the last three months, did it happen even once that your household experienced hunger and did not have anything to eat?</label>
                            <div class="form-text">Noong nakaraang tatlong buwan, nangyari ba kahit minsan na ang inyong sambahayan ay nakaranas ng gutom at walang makain?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="fshort" id="fshort" class="form-control form-control-sm" required="required">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SectionDeath" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title">T. PREVIOUS HOUSEHOLD MEMBERS</h5>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">(158) Was there any household member who died in the past 12 months?</label>
                            <div class="form-text">Noong nakaraang labindalawang buwan, mayroon ba kayong dating miyembro ng sambahayan na namatay?</div>
                        </div>
                        <div class="col-sm-6">
                            <select name="prevmind" id="prevmind" class="form-control form-control-sm">
                                <option></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 prevmind">
                        <div class="col-sm-4">
                            <label class="form-label">(158.1) How many deaths?</label>
                            <div class="form-text">Ilan ang namatay?</div>
                        </div>
                        <div class="col-sm-4">
                            <input name="ndeath" id="ndeath" type="number" min="1" class="form-control form-control-sm">
                        </div>
                        <div class="col-sm-4">
                            <div id="add_hpq_death_btn" class="btn btn-sm btn-success" onclick="add_deceased();">
                                <i class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3 prevmind">
                        <div class="table-responsive">
                            <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Sex</th>
                                        <th>Age</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="hpq_death_table">
                                    <!-- Dynamicaly generated html table --></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page8">
            <div id="ProgramsPage" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title">V. Programs</h5>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Add programs received by the household</label>
                            <div class="form-text">Ilagay ang mga programang natanggap ng sambahayan</div>
                        </div>
                        <div class="col-sm-6">
                            <a name="add_hpq_prog_btn" id="addprogbtn" class="btn btn-success btn-sm" onclick="add_prog();">
                                <i class="bi bi-plus-lg"></i>
                            </a>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="table-responsive">
                            <table class="table table-sm table-borderless table-hover text-dark" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width="40%">Types of programs</th>
                                        <th width="40%">Name of program</th>
                                        <th width="20%">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="hpq_prog_table">
                                    <!-- Dynamicaly generated html table for hpq_prog --></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="main_page9">
            <div id="SectionEnd" class="card mb-3 p-1">
                <div class="card-body">
                    <h5 class="card-title">Note and Remarks</h5>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Note and Remarks</label>
                            <div class="form-text"></div>
                        </div>
                        <div class="col-sm-6">
                            <textarea name="note" id="note" value="" type="textarea" class="form-control form-control-sm"></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Form status</label>
                            <div class="form-text"></div>
                        </div>
                        <div class="col-sm-6">
                            <select id="hpq_stat" name="hpq_stat" class="form-control form-control-sm">
                                <option value="0">Incomplete</option>
                                <option value="1">Not validated</option>
                                <option value="2">Validated</option>
                                <option value="3" disabled>Uploaded</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Date ended</label>
                            <div class="form-text">Oras natapos</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="end_date" id="end_date" type="date" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Time ended</label>
                            <div class="form-text">Oras natapos</div>
                        </div>
                        <div class="col-sm-6">
                            <input name="end_time" id="end_time" type="time" class="form-control form-control-sm" readonly="readonly">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Encoder</label>
                            <div class="form-text"></div>
                        </div>
                        <div class="col-sm-6">
                            <input name="encoder" id="encoder" value="" type="text" class="form-control form-control-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="form-label">Filename</label>
                            <div class="form-text"></div>
                        </div>
                        <div class="col-sm-6">
                            <input name="filename" id="filename" value="" type="text" class="form-control form-control-sm" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</div>
<div class="py-3 d-flex flex-row align-items-center justify-content-between">
<button id="prev" class="btn btn-primary text-white mr-1 ml-1" disabled>
    <i class="bi bi-arrow-left"></i>
    Prev
</button>
<button id="next" class="btn btn-primary text-white mr-1 ml-1">
    Next
    <i class="bi bi-arrow-right"></i>
</button>
</div>`;