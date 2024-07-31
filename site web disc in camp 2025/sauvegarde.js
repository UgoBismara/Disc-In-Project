function doGet() {
    var spreadsheetId = '1zwk0ncVAhkDdHLKpQ9vCzJEzoijYhY3v80_k1K729Rg';
  
    // Récupérer les données de la feuille "Players"
    var sheetNamePlayers = 'Players'; // Assurez-vous que c'est le nom exact de la feuille
    var sheetPlayers = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetNamePlayers);
    var participants = [];
  
    if (sheetPlayers) {
      var data = sheetPlayers.getRange(2, 1, sheetPlayers.getLastRow() - 1, 8).getValues(); // Obtenir toutes les lignes après le titre
      participants = data.map(function(row) {
        return {
          Id: row[0],
          Name: row[1],
          Pictures: row[2],
          Team: row[3],
          Level: row[4],
          Gender: row[5],
          Money: row[6],
          Crush: row[7],
          teamAndLevel: getTeamAndLevel(row[3], row[4]) // Ajout de la nouvelle information
        };
      });
    } else {
      Logger.log('Feuille non trouvée : ' + sheetNamePlayers);
    }
  
    // Récupérer l'information de la cellule A1 de la feuille "Monday"
    var sheetNameMonday = 'Monday'; // Assurez-vous que c'est le nom exact de la feuille
    var sheetMonday = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetNameMonday);
    var mondayInfo = '';
  
    if (sheetMonday) {
      mondayInfo = sheetMonday.getRange('A1').getValue();
    } else {
      Logger.log('Feuille non trouvée : ' + sheetNameMonday);
    }
  
    // Créer l'objet de réponse
    var response = {
      participants: participants,
      mondayInfo: mondayInfo
    };
  
    Logger.log('Response: ' + JSON.stringify(response));
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Fonction pour obtenir la nouvelle information teamAndLevel
  function getTeamAndLevel(team, level) {
    return team.charAt(0).toUpperCase() + level;
  }
  
  