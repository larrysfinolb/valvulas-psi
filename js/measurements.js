$(document).ready(() => {
  const fetchMeasurements = () => {
    $.ajax({
      url: './php/measurements/get-all.php',
      type: 'GET',
      success: function (response) {
        const valves = JSON.parse(response);
        let tbodyTemplate = '';

        valves.map((valve) => {
          tbodyTemplate += `
            <tr>
              <th scope="row">${valve.id}</th>
              <td>${valve.valve}</td>
              <td>${valve.date}</td>
              <td>${valve.psi}</td>
            </tr>`;
        });
        $('#tbody').html(tbodyTemplate);
      },
    });
  };
  const fetchWells = (idParent) => {
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

        $(`#${idParent}`).html(selectTemplate);
      },
    });
  };
  const fetchValvesByWell = (well, idParent) => {
    if (isNaN(Number(well))) {
      let selectTemplate = '<option selected>Primero debes seleccionar un pozo</option>';
      $('#valve').html(selectTemplate);
    } else {
      $.ajax({
        url: './php/valves/get-by-well.php',
        type: 'GET',
        data: { well },
        success: function (response) {
          const valves = JSON.parse(response);
          let selectTemplate = '<option selected>Selecciona una válvula</option>';

          valves.map((valve) => {
            selectTemplate += `
              <option value="${valve.id}">${valve.name}</option>`;
          });
          $(`#${idParent}`).html(selectTemplate);
        },
      });
    }
  };

  fetchMeasurements();
  fetchWells('well');
  fetchWells('wellGraphic');
  fetchWells('searchByWell');

  $('#wellGraphic').change(() => {
    const well = $('#wellGraphic').val();
    fetchValvesByWell(well, 'valveGraphic');
  });
  $('#well').change(() => {
    const well = $('#well').val();

    fetchValvesByWell(well, 'valve');
  });

  $('#generateGraphic').click(() => {
    const ctx = document.getElementById('chart');

    const valve = $('#valveGraphic').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();

    if (!isNaN(Number(valve)) && startDate !== '' && endDate !== '') {
      $.ajax({
        url: './php/measurements/get-between-dates.php',
        type: 'GET',
        data: { valve, startDate, endDate },
        success: function (response) {
          console.log(response);
          const measurements = JSON.parse(response);
          let dates = measurements.map((measurement) => measurement.date);
          let psi = measurements.map((measurement) => measurement.psi);

          if (window.chart.destroy) {
            window.chart.destroy();
          }

          window.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: dates,
              datasets: [
                {
                  label: `Medidas de la valvula entre ${startDate} y ${endDate}`,
                  data: psi,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        },
      });
    }
  });

  $('#searchByWell').change(() => {
    const well = $('#searchByWell').val();

    if (!isNaN(Number(well))) {
      fetchValvesByWell(well, 'searchByValve');
    } else {
      let selectTemplate = '<option selected>Primero debes seleccionar un pozo</option>';
      $('#searchByValve').html(selectTemplate);
      fetchMeasurements();
    }
  });
  $('#searchByValve').change(() => {
    const valve = $('#searchByValve').val();

    if (!isNaN(Number(valve))) {
      $.ajax({
        url: './php/measurements/get-by-valve.php',
        type: 'GET',
        data: { valve },
        success: function (response) {
          const measurements = JSON.parse(response);
          let tbodyTemplate = '';

          measurements.map((measurement) => {
            tbodyTemplate += `
              <tr>
                <th scope="row">${measurement.id}</th>
                <td>${measurement.valve}</td>
                <td>${measurement.date}</td>
                <td>${measurement.psi}</td>
              </tr>`;
          });
          $('#tbody').html(tbodyTemplate);
        },
      });
    } else {
      fetchMeasurements();
    }
  });

  $('#form').submit((e) => {
    e.preventDefault();
    const postData = {
      valve: $('#valve').val(),
      psi: $('#psi').val(),
    };

    $.post('./php/measurements/create.php', postData, (response) => {
      console.log(response);

      $('#form')[0].reset();
      $('#formSearch')[0].reset();

      fetchMeasurements();
    });
  });
});
