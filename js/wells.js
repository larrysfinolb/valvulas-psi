$(document).ready(() => {
  const fetchWells = () => {
    $.ajax({
      url: './php/wells/get-all.php',
      type: 'GET',
      success: function (response) {
        const wells = JSON.parse(response);
        let tbodyTemplate = '';

        wells.map((well) => {
          tbodyTemplate += `
										<tr>
												<th scope="row">${well.id}</th>
												<td>${well.name}</td>
												<td>${well.location}</td>
										</tr>`;
        });
        $('#tbody').html(tbodyTemplate);
      },
    });
  };

	fetchWells();

  $('#form').submit((e) => {
    e.preventDefault();
    const postData = {
      name: $('#name').val(),
      location: $('#location').val(),
    };

    $.post('./php/wells/create.php', postData, (response) => {
			console.log(response);
			$('#form')[0].reset();
			fetchWells();
    });
  });
});
