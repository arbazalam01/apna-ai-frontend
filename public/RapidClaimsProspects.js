

const data = `First Name,Last Name,Title,Company,Email,Industry,Website,Country,Subject,Body,Prospect Linkedin URL
Joy,Sloan,CFO,CommUnityCare Health Centers,joy.sloan@communitycaretx.org,hospital & health care,http://www.communitycaretx.org,United States,,,http://www.linkedin.com/in/joy-sloan-2ba217122
Rhonda,Gold,Chief Financial Officer,America's Essential Hospitals,rgold@essentialhospitals.org,hospital & health care,http://www.essentialhospitals.org,United States,,,http://www.linkedin.com/in/rhonda-gold-229039a
Linda,Hoff,CFO,Stanford Health Care,lhoff@stanfordhealthcare.org,hospital & health care,http://www.stanfordhealthcare.org,United States,,,http://www.linkedin.com/in/linda-hoff-5ba90711
Scott,Silvestri,CFO,Memorial Health System,scsilvestri@mhsystem.org,hospital & health care,http://www.mhsystem.org,United States,,,http://www.linkedin.com/in/scott-silvestri-117b7417
David,D'Amico,Chief Financial Officer,Catholic Health Services,ddamico@chsfla.com,hospital & health care,http://www.catholichealthservices.org,United States,,,http://www.linkedin.com/in/dave-d-amico-71971773
George,Barreto,Chief Financial Officer,KC CARE Health Center,georgeb@kccare.org,hospital & health care,http://www.kccare.org,United States,,,http://www.linkedin.com/in/george-barreto-5b705026
Karen,Wegmann,Chief Financial Officer,Vibrant Emotional Health,kwegmann@fedcap.org,hospital & health care,http://www.vibrant.org,United States,,,http://www.linkedin.com/in/karen-wegmann-75898b9b
Pamela,Oliver,Chief Medical Officer,Novant Health,paoliver@novanthealth.org,hospital & health care,http://www.novanthealth.org,United States,,,http://www.linkedin.com/in/pamelaoliver
Patrick,Tellez,Chief Medical Officer,Community Health Group,ptellez@chgsd.com,hospital & health care,http://www.chgsd.com,United States,,,http://www.linkedin.com/in/patrick-tellez-99974b248
Brian,Kiedrowski,Chief Medical Officer,Catholic Health Services,bkiedrowski@chsfla.com,hospital & health care,http://www.catholichealthservices.org,United States,,,http://www.linkedin.com/in/brian-kiedrowski-9a1a05216
Mark,Calderon,Chief Medical Officer,Atlantic Health System,mark.calderon@atlantichealth.org,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/calderonmd
Jack,Audett,Chief Medical Officer,Atlantic Health System,john.audett@atlantichealth.org,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/jack-audett-379b4211a
Teresa,Wesley,Chief Medical Officer,UnitedHealth Group,teresa_wesley@uhc.com,hospital & health care,http://www.unitedhealthgroup.com,United States,,,http://www.linkedin.com/in/dr-teresa-wesley-md-14782b2b
Steve,Heilman,Chief Medical Information Officer,Norton Healthcare,steve.heilman@nortonhealthcare.org,hospital & health care,http://www.nortonhealthcare.com,United States,,,http://www.linkedin.com/in/steve-heilman-m-d-59656743
Cynthia,Holzer,Chief Medical Officer,UnitedHealth Group,cholzer@uhc.com,hospital & health care,http://www.unitedhealthgroup.com,United States,,,http://www.linkedin.com/in/cynthia-holzer-0a9b7824
Bruce,Siegel,President & CEO,America's Essential Hospitals,bsiegel@essentialhospitals.org,hospital & health care,http://www.essentialhospitals.org,United States,,,http://www.linkedin.com/in/bruce-siegel-793b5219
Troy,McKnight,Chief Executive Officer,Willow Brook Christian Communities,tmcknight@cccinc.net,hospital & health care,http://www.willow-brook.org,United States,,,http://www.linkedin.com/in/troy-mcknight-0380428
Chris,Riopelle,CEO,Strive Health,criopelle@strivehealth.com,hospital & health care,http://www.strivehealth.com,United States,,,http://www.linkedin.com/in/chris-riopelle-07a9997a
Bill,Schneider,CEO,Northwest Hospital & Medical Center,bschneider@northwestmed.com,hospital & health care,http://www.nwhospital.org,United States,,,http://www.linkedin.com/in/bill-schneider-210b3446
Norma,Diaz,Chief Executive Officer,Community Health Group,ndiaz@chgsd.com,hospital & health care,http://www.chgsd.com,United States,,,http://www.linkedin.com/in/norma-diaz-117a9b9
Scott,Ng,CEO/Administrator,Signature HealthCARE,scott.ng@sharp.com,hospital & health care,http://www.ltcrevolution.com,United States,,,http://www.linkedin.com/in/scottsng
Domonic,Hopson,President and Chief Executive Officer,Neighborhood Family Practice,dhopson@nfpmedcenter.org,hospital & health care,http://www.nfpmedcenter.org,United States,,,http://www.linkedin.com/in/domonic-hopson-mph-fache-aa5ab7a9
Julie,Shupe,Chief Operating Officer,Inspiration Hospice and Home Health,jshupe@asf-insp.com,hospital & health care,http://www.inspirationhospice.com,United States,,,http://www.linkedin.com/in/julie-shupe-986b77182
Quinn,McKenna,Chief Operating Officer,Stanford Health Care,qmckenna@stanfordhealthcare.org,hospital & health care,http://www.stanfordhealthcare.org,United States,,,http://www.linkedin.com/in/quinn-mckenna-7b2874a1
Angelleen,Peters-Lewis,Chief Operating Officer,Barnes-Jewish Hospital,angelleen.peterslewis@bjc.org,hospital & health care,http://www.barnesjewish.org,United States,,,http://www.linkedin.com/in/angelleen-peters-lewis-phd-rn-faan-7414a173
Tom,Paul,Chief Operating Officer,UnitedHealth Group,paul@uhc.com,hospital & health care,http://www.unitedhealthgroup.com,United States,,,http://www.linkedin.com/in/tom-paul-08a610a
Jessica,Prince,Chief Operating Officer,Brockton Neighborhood Health Center,princej@bnhc.org,hospital & health care,http://www.bnhc.org,United States,,,http://www.linkedin.com/in/jessica-prince-msn-rn-amb-bc-cic-408330b2
Kevin,Reynolds,Chief Operating Officer,CareFlite,kreynolds@careflite.org,hospital & health care,http://www.careflite.org,United States,,,http://www.linkedin.com/in/kevin-reynolds-9a837226
Dennis,Dunmyer,Chief Operating Officer,KC CARE Health Center,dennisd@kccare.org,hospital & health care,http://www.kccare.org,United States,,,http://www.linkedin.com/in/dennis-dunmyer-550b418
Kelli,Castellano,Chief Marketing Officer,Aidoc,kellic@aidoc.com,hospital & health care,http://www.aidoc.com,United States,,,http://www.linkedin.com/in/kellicastellano
Eric,Steinberger,Chief Marketing Officer,Atlantic Health System,eric.steinberger@atlantichealth.org,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/esteinberger
Michiko,Tanabe,Chief Marketing Officer,Stanford Health Care,mtanabe@stanfordhealthcare.org,hospital & health care,http://www.stanfordhealthcare.org,United States,,,http://www.linkedin.com/in/michiko-tanabe-9436771
Terry,Clark,Chief Marketing Officer,UnitedHealth Group,terry@uhg.com,hospital & health care,http://www.unitedhealthgroup.com,United States,,,http://www.linkedin.com/in/terryclark
Jody,Martin,Chief Marketing Officer,Smile Brands,jody.martin@smilebrands.com,hospital & health care,http://www.smilebrands.com,United States,,,http://www.linkedin.com/in/jodyfmartin
Dave,Zychinski,Chief Marketing Officer,MDLIVE by Evernorth,dzychinski@mdlive.com,hospital & health care,http://www.mdlive.com,United States,,,http://www.linkedin.com/in/dave-zychinski-7056921b
Jorge,Perez,Dade Market CMO,Conviva Care Center,jcperez@mccigroup.com,hospital & health care,http://www.convivacarecenters.com,United States,,,http://www.linkedin.com/in/jorge-c-perez-620250a0
Gregory,Buller,Chairman of Medicine and Associate CMO,Yale New Haven Health,gregory.buller@ynhh.org,hospital & health care,http://www.ynhhs.org,United States,,,http://www.linkedin.com/in/gregory-buller-75240a9b
Allan,Sombillo,Chief Information Officer,Community Health Group,asombi@chgsd.com,hospital & health care,http://www.chgsd.com,United States,,,http://www.linkedin.com/in/allan-sombillo-ba475250
Dario,Sosa,Chief Information Officer,InteliChart,dsosa@intelichart.com,hospital & health care,http://www.intelichart.com,United States,,,http://www.linkedin.com/in/dario-sosa-697b371b
Doug,Owens,Chief Information Officer,Signature HealthCARE,dougowens@signaturehealthcarellc.com,hospital & health care,http://www.ltcrevolution.com,United States,,,http://www.linkedin.com/in/doug-owens-4738abb6
Andy,Xie,Chief Information Officer,Lorien Health Services,axie@lorienhealth.com,hospital & health care,http://www.lorienhealth.com,United States,,,http://www.linkedin.com/in/xieandy
John,Clark,Chief Information Officer,Central Health,john.clark@centralhealth.net,hospital & health care,http://www.centralhealth.net,United States,,,http://www.linkedin.com/in/john-clark-mba-130919168
Wayne,Kinneman,Chief Information Officer,The Goodman Group,wkinneman@thegoodmangroup.com,hospital & health care,http://www.thegoodmangroup.com,United States,,,http://www.linkedin.com/in/wayne-kinneman-0107587
Ted,Bredikin,CIO,UnitedHealth Group,ted_bredikin@uhc.com,hospital & health care,http://www.unitedhealthgroup.com,United States,,,http://www.linkedin.com/in/bredikin
Sandy,Sauereisen,Medical Doctor,ssauereisen@nfpmedcenter.org,Neighborhood Family Practice,hospital & health care,http://www.nfpmedcenter.org,United States,,,http://www.linkedin.com/in/sandy-sauereisen-304a82106
Long,Wang,Medical Doctor,long.wang@atlantichealth.org,Atlantic Health System,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/long-qin-wang-5770721b
Lisa,Vasak,Medical Doctor,lisa.vasak@dignityhealth.org,Dignity,hospital & health care,http://www.dignitylcservices.co.uk,United States,,,http://www.linkedin.com/in/lisa-vasak-18664916a
Michael,Gannon,Medical Doctor,michael.gannon@atlantichealth.org,Atlantic Health System,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/michael-gannon-9b7b036a
Knika,Sethi,"Resident Doctor, Oral and Maxillofacial Surgery",knika.sethi@carle.com,Carle Health,hospital & health care,http://www.carle.org,United States,,,http://www.linkedin.com/in/knika-sethi-338720137
Margaret,Sacco,Medical Doctor,margaretmary.sacco@atlantichealth.org,Atlantic Health System,hospital & health care,http://www.atlantichealth.org,United States,,,http://www.linkedin.com/in/margaret-mary-sacco-80b919297`


export default data;