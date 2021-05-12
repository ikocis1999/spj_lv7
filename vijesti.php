<?php 
	$sJsonFile = file_get_contents('./vijesti.json', FILE_USE_INCLUDE_PATH);
	$oJson = json_decode($sJsonFile);

	$sAkcija = $_POST['akcija'];

switch($sAkcija)
{
	case 'dodaj_vijest':
		$sVijestNaziv = $_POST['vijest_naziv'];
		$sVijestTekst = $_POST['vijest_tekst'];
		$sId = intval(GetLastPostID())+1;
		$sDate = date("d.m.Y");

		$aNewVijest = array
		(
			"post_id" => $sId,
		    "post_naziv" =>	$sVijestNaziv,
		    "datum" => $sDate,
		    "post_tekst" => $sVijestTekst
		);
		array_push($oJson, $aNewVijest);
		ZapisiJson($oJson);
	break;

	case 'obrisi_vijest':
		$nVijestID = $_POST['vijest_id'];
		ObrisiVijest($nVijestID);
		echo $nVijestID;
	break;
}

function GetLastPostID()
{
	global $sJsonFile;
	global $oJson;
	$brojac;
	foreach ($oJson as $vijest) {
		$brojac = $vijest->post_id;
	}
	return $brojac;
}

function ZapisiJson($oJsonData)
{
	$sJsonString = json_encode($oJsonData);
	file_put_contents('./vijesti.json', $sJsonString);
}

function ObrisiVijest($nVijestID)
{

	global $oJson;
	$nKey = -1;
	for($i=0; $i<count($oJson); $i++)
	{
		if($nVijestID == $oJson[$i]->post_id)
		{
			$nKey = $i;
		}
	}

	if($nKey  != -1)
	{
		array_splice($oJson, $nKey, 1);
		ZapisiJson($oJson);
	}
	var_dump($oJson);

}
?>