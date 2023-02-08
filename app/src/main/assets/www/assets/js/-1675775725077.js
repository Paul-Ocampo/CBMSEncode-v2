//#region add aquani section
function add_aquani() {

    aquaniEditMode = false;

    $("#hpq_alp_modal").modal("show");

}
function edit_aquani(aquaniToEdit) {

    aquaniEditMode = true;
    aquaniEdited = aquaniToEdit;
    let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));

    $("#hpq_aquani_modal").modal("show");

    console.log(JSON.stringify(hpq_aquani_TEMP, null, 4))

    $.each(hpq_aquani_TEMP, function (i, aquaniRow) {

        if (aquaniRow.aquaniindex == aquaniToEdit) {
            for (let key in aquaniRow) {

                $("#hpq_aquani_form").find("#" + key).val(aquaniRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_aquani(aquani_index_to_delete) {

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
            let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));

            var remaquani = hpq_aquani_TEMP.filter(items => items.aquaniindex != aquani_index_to_delete);

            Android.setTemp("hpq_aquani", JSON.stringify(remaquani));

            hpq_aquani = remaquani;

            get_aquani(hpq_aquani);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_aquani(aquaniData) {

    let c = [];
    $.each(aquaniData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.aquaniindex + '</td>');
        c.push('    <td>' + item.aquanitype + '</td>');
        c.push('    <td>' + item.aquani_vol + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_alp(' + item.aquaniindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_alp(' + item.aquaniindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_alp(' + item.aquaniindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_aquani_table").html(c.join("").toString());
}
$("#hpq_aquani_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_aquani_form").on("submit", function (e) {
    e.preventDefault();

    let aquaniData = $("#hpq_aquani_form").serializeJSON();
    let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));
    let aquaniArr = [];
    let aquani_last_index

    if (hpq_aquani_TEMP.length < 1) {
        hpq_aquani_TEMP = [];
        aquani_last_index = 0
    } else {
        $.each(hpq_aquani_TEMP, function (i, item) {
            aquaniArr.push(item.aquaniindex);
        });
        aquani_last_index = Math.max.apply(Math, aquaniArr) + 1;
    }

    if (aquaniEditMode) {
        hpq_aquani_TEMP.splice(aquaniEdited, 1, aquaniData);
    } else {
        aquaniData["aquaniindex"] = aquani_last_index;
        hpq_aquani_TEMP.push(aquaniData);
    }

    Android.setTemp("hpq_aquani", JSON.stringify(hpq_aquani_TEMP));

    $("#hpq_aquani_modal").modal("hide");

    hpq_aquani = hpq_aquani_TEMP;

    get_alp(hpq_aquani);

});
$("#hpq_aquani_modal").on("shown.bs.modal", function (e) {

    $("#aquanitype").on("change", function () {
        if ($("#aquanitype").val() == 6) {
            $(".aquanitype_o").show();
            $("#aquanitype_o").required();
        } else {
            $(".aquanitype_o").hide();
            $("#aquanitype_o").val("").notRequired();
        }
    });

});
$("#hpq_aquani_modal").on("hidden.bs.modal", function (e) {
    $("#aquanitype").off();
    document.getElementById("hpq_aquani_form").reset();
});
//#endregion end of add aquani section
