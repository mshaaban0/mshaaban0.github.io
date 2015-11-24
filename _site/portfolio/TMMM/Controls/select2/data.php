<?php
//$array = json_decode( '{"total": 200, "items": [{"name":"KasimirColeman","path":"Luxembourg"},{"name":"LinusN.Vega","path":"Myanmar"},{"name":"AstraKing","path":"Somalia"},{"name":"ReeseMarsh","path":"SintMaarten"},{"name":"HenryK.Mcknight","path":"Slovakia"},{"name":"HopeGarrison","path":"BritishIndianOceanTerritory"},{"name":"PandoraPrince","path":"Montenegro"},{"name":"MerrittU.Erickson","path":"IsleofMan"},{"name":"AdrienneK.Potter","path":"Gibraltar"},{"name":"RhonaCarpenter","path":"Iran"},{"name":"AprilLynn","path":"Namibia"},{"name":"KellyF.Cline","path":"Jersey"},{"name":"ZephrSuarez","path":"Guyana"},{"name":"QuincyA.Shaffer","path":"Armenia"},{"name":"SimonHyde","path":"Reunion"},{"name":"EthanV.Fulton","path":"Lesotho"},{"name":"ChaneyU.Barnes","path":"Panama"},{"name":"WilmaS.Hopkins","path":"Eritrea"},{"name":"MarsdenZ.Mcgowan","path":"Lithuania"},{"name":"ReubenC.Miles","path":"UnitedStates"},{"name":"VivienHouse","path":"Andorra"},{"name":"DamonF.Koch","path":"Uruguay"},{"name":"KimberleyF.Mueller","path":"Djibouti"},{"name":"ChandlerRich","path":"Somalia"},{"name":"CyrusRichard","path":"Cameroon"},{"name":"LukeW.Callahan","path":"Niger"},{"name":"MaxineF.Welch","path":"Mozambique"},{"name":"HadleyS.Mcbride","path":"SanMarino"},{"name":"SadeMcdowell","path":"Cuba"},{"name":"LamarE.Weeks","path":"Belize"},{"name":"AlexisPotts","path":"Angola"},{"name":"EricMoody","path":"Estonia"},{"name":"BreannaT.Bell","path":"BosniaandHerzegovina"},{"name":"JacquelineO.Stevens","path":"SouthGeorgiaandTheSouthSandwichIslands"},{"name":"DriscollS.Roach","path":"SouthSudan"},{"name":"ZeleniaD.Burt","path":"SouthAfrica"},{"name":"MosesBritt","path":"VirginIslands,British"},{"name":"ShellyBowman","path":"Palestine,Stateof"},{"name":"GriffinKnight","path":"Togo"},{"name":"AvramB.Whitfield","path":"Belgium"},{"name":"CourtneyTyson","path":"SouthAfrica"},{"name":"CassidyZ.Blanchard","path":"Tanzania"},{"name":"QuinMarks","path":"Dominica"},{"name":"JoyP.Atkinson","path":"WesternSahara"},{"name":"JocelynP.Stewart","path":"Senegal"},{"name":"NicholeMcmillan","path":"Afghanistan"},{"name":"CadmanSummers","path":"Argentina"},{"name":"ArsenioFleming","path":"VietNam"},{"name":"LibertyWeiss","path":"Brazil"},{"name":"AileenA.Bright","path":"Anguilla"},{"name":"VaughanF.Gentry","path":"Denmark"},{"name":"GretchenW.Travis","path":"SvalbardandJanMayenIslands"},{"name":"AdriaI.Key","path":"SaintKittsandNevis"},{"name":"RoannaV.Lawson","path":"Netherlands"},{"name":"EvelynG.Banks","path":"Guernsey"},{"name":"LouisZ.Francis","path":"CookIslands"},{"name":"JeanetteM.Reese","path":"DominicanRepublic"},{"name":"MelindaM.Wall","path":"Kazakhstan"},{"name":"MerrillZ.Campos","path":"Chad"},{"name":"ConanLogan","path":"Zambia"},{"name":"AddisonCortez","path":"Nauru"},{"name":"CamdenV.Russell","path":"Rwanda"},{"name":"EdwardContreras","path":"Qatar"},{"name":"HolleeTaylor","path":"FrenchPolynesia"},{"name":"LeighQ.King","path":"Guernsey"},{"name":"RafaelY.Cannon","path":"UnitedKingdom(GreatBritain)"},{"name":"PaulN.Baker","path":"Myanmar"},{"name":"VernonGentry","path":"VietNam"},{"name":"MelanieG.Cain","path":"NewCaledonia"},{"name":"BellW.Armstrong","path":"Canada"},{"name":"SheilaP.Love","path":"Mexico"},{"name":"MeganV.Barnes","path":"Guyana"},{"name":"PaulaK.Morin","path":"SanMarino"},{"name":"MayHebert","path":"Malta"},{"name":"HaydenG.Wolfe","path":"Macedonia,theformerYugoslavRepublicof"},{"name":"SeanBright","path":"VirginIslands,UnitedStates"},{"name":"RobertO.Blanchard","path":"Qatar"},{"name":"GalenaO.Meyer","path":"Cameroon"},{"name":"SolomonParrish","path":"Anguilla"},{"name":"CraigV.Riggs","path":"Portugal"},{"name":"ArthurOsborn","path":"CôteDIvoire(IvoryCoast)"},{"name":"FerdinandWalton","path":"Tunisia"},{"name":"GannonQ.Lambert","path":"Mauritania"},{"name":"GageMcgee","path":"AntiguaandBarbuda"},{"name":"ConnorRasmussen","path":"IsleofMan"},{"name":"JoshuaG.Simpson","path":"Brunei"},{"name":"GillianBarrera","path":"Luxembourg"},{"name":"StaceyB.Goff","path":"Namibia"},{"name":"JacksonMullins","path":"Uzbekistan"},{"name":"HopeHarper","path":"Serbia"},{"name":"MalachiR.Wells","path":"Vanuatu"},{"name":"ArmandoY.Barrera","path":"HeardIslandandMcdonaldIslands"},{"name":"DaphneB.Holman","path":"Bolivia"},{"name":"NolaBerg","path":"Bahamas"},{"name":"JosephineD.Spence","path":"Somalia"},{"name":"RebeccaRodriguez","path":"Sweden"},{"name":"PatienceDouglas","path":"CapeVerde"},{"name":"BurtonErickson","path":"VirginIslands,UnitedStates"},{"name":"ReedH.Carr","path":"Albania"},{"name":"MollieK.Cox","path":"Angola"}]}', true);
$con = mysqli_connect("localhost","root","","hmoud_el");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$search = trim($_GET['q']);

$exclude = isset($_GET['exclude']) && !empty($_GET['exclude'])? " id NOT IN(" . implode($_GET['exclude'], ", ") . ')' : '';

$total = 0;
$data = array();
if($search)
{
	$exclude .= !empty($exclude) ? ' AND ' : '';
	$sql = "SELECT * FROM data WHERE name like '%{$search}%' $exclude";
}
else
{
	$exclude = !empty($exclude) ? ' WHERE  ' . $exclude : '';
	$sql = "SELECT * FROM data $exclude";
}

$result = mysqli_query($con, $sql);
while( $row = mysqli_fetch_assoc($result)) {
	$data[] = $row;
}

echo 'jsonCallback('. json_encode(array('total'=> $total, 'items'=>$data)) . ')';

/*
$sql = "SELECT * FROM data";

$result = mysqli_query($con, $sql);
while( $row = mysqli_fetch_assoc($result)) {
	mysqli_query($con, $sql);
}*/
?>