$(document).ready(() => {
  const fetchValves = () => {
    $.ajax({
      url: './php/valves/get-all.php',
      type: 'GET',
      success: function (response) {
        const valves = JSON.parse(response);
        let tbodyTemplate = '';

        valves.map((valve) => {
          tbodyTemplate += `
            <tr>
                <th scope="row">${valve.id}</th>
                <td>${valve.well}</td>
                <td>${valve.name}</td>
            </tr>`;
        });
        $('#tbody').html(tbodyTemplate);
      },
    });
  };
  const fetchWells = () => {
    $.ajax({
      url: './php/wells/get-all.php',
      type: 'GET',
      success: function (response) {
        const wells = JSON.parse(response);
        let selectTemplate = '<option selected>Selecciona un pozo</option>';

        wells.map((well) => {
          selectTemplate += `
            <option value="${well.id}">${well.name}</option>`;
        });
        $('#well').html(selectTemplate);
      },
    });
  };

  fetchValves();
  fetchWells();

  $('#form').submit((e) => {
    e.preventDefault();
    const postData = {
      name: $('#name').val(),
      well: $('#well').val(),
    };

    $.post('./php/valves/create.php', postData, (response) => {
      console.log(response);
      $('#form')[0].reset();
      fetchValves();
    });
  });
});
