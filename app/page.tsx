'use client';
/* WORLD: A vivid civic learning exhibit, cobalt blue, white, peach and sea green. Plain-language reading on a bright kitchen-table screen.
   SURFACE: An overview leads to County, Schools, and City; shared math, an annual timeline, help, and supporting references follow.
   FORM: Interactive museum field guide, candidate 3; ca5f35a6.
   FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md */
import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, House, Landmark, GraduationCap, TreePine, Scale, FileText, CalendarDays, Phone, Info, ChevronDown, ChevronRight, Calculator as CalculatorIcon, Ellipsis, Wallet } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
const money=(v:number, cents=false)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:cents?2:0,minimumFractionDigits:cents?2:0}).format(v);
const links={escrow:'https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/',escrowReview:'https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/mortserv/mortgage-servicing-faqs/',escrowHelp:'https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-having-problems-with-my-escrow-or-impound-account-en-2082/',records:'https://qpublic.schneidercorp.com/Application.aspx?App=FultonCountyGA&PageType=Search',city:'https://www.roswellgov.com/government/departments-division/finance/taxes/property-taxes/',county:'https://www.fultoncountytaxes.org/',assessor:'https://fultonassessor.org/',bills:'https://www.fultoncountyga.gov/News/2026/08/14/Fulton-County-Issues-Property-Tax-Bills',assessment:'https://www.fultoncountyga.gov/News/2026/06/19/Fulton-County-2026-Assessments-Now-Available-Online',adoption:'https://www.roswellconnections.com/city-council-approves-property-tax-rate-for-2026/',proposal:'https://roswellconnections.com/city-of-roswell-proposes-property-tax-rate-increase-to-address-critical-city-needs/',mills:'https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates',exemption:'https://dor.georgia.gov/property-tax-homestead-exemptions',appeal:'https://www.fultoncountyga.gov/inside-fulton-county/fulton-county-departments/board-of-assessors/appealing-your-assessment'};
const components=[{name:'Fulton County',short:'County',rate:8.87,color:'county',icon:Landmark,services:'Courts, elections, libraries, jail operations, and human services.',decision:'Board of Commissioners',vote:'Your district commissioner and the countywide chair',bill:'Fulton bill'},{name:'Fulton County Schools',short:'Schools',rate:17.08,color:'schools',icon:GraduationCap,services:'The public school system, beyond just the school assigned to your address.',decision:'Elected Board of Education',vote:'Your school board member, elected by district',bill:'Fulton bill'},{name:'City of Roswell',short:'City',rate:4.949,color:'city',icon:TreePine,services:'Police, fire protection, parks, roads, and zoning.',decision:'Roswell City Council',vote:'The mayor and all six council members, elected citywide',bill:'Separate city bill'}];
const timelineLabels:Record<string,string>={state:'State',county:'County',schools:'Schools',city:'City'};
const yearTimeline:[string,string,string,string][]=[
 ['January–spring','state','The legislature meets','Lawmakers can change property tax rules. The 2026 session brought SB 566 and the one-time relief grant.'],
 ['January 1','all','Values and homestead status are set','Fulton values your home as of this date. County, school, and city taxes all start from that value.'],
 ['April 1','county','Homestead filing deadline','File with Fulton’s Board of Assessors. April 1 filers also qualified for the state’s $18,000 relief grant.'],
 ['June 1','city','City exemption deadline','Apply with Roswell Finance for city senior and disabled veteran exemptions.'],
 ['June 19','county','Assessment notices arrive','Fulton posted and mailed 2026 notices. Check the value and the exemptions listed.'],
 ['July 31','county','Appeal deadline for most owners','45 days from the notice. Appeal the value or apply for exemptions; the value you appeal is used for county, school, and city taxes.'],
 ['August 15','county','Temporary Fulton bills mailed','County and school tax on one bill, using preliminary 2026 values and 2025 rates.'],
 ['August 20','schools','Schools propose 18.08 mills','Tentatively approved, up from 17.08. Three public meetings come before the final vote.'],
 ['September 14','city','City proposes 5.9 mills','The council replaced its first proposal of 7.732 mills. The public hearing followed on September 21.'],
 ['September 28','city','City adopts 5.232 mills','The adopted 2026 rate includes 4.049 mills for operations and 1.183 mills for debt service, which repays the city’s bonds.'],
 ['Sept 30 & Oct 7','county','County rate hearings','Tentative 8.87 mills, above the 8.822 rollback rate. September 30 at 10 a.m. and 6 p.m.; October 7 at 10 a.m.'],
 ['October 15','county','Fulton bill due','Pay the temporary bill even if you appealed. A revised bill or refund follows if needed.'],
 ['By end of October','city','City bill expected','Roswell expects to mail its separate 2026 tax bill before the end of October.'],
 ['60 days after billing','city','City bill due','The city says payment is due no later than December 31, 2026. Use the due date printed on your bill.']
];
function Source({href,children}:{href:string;children:React.ReactNode}){const internal=href.startsWith('#');return <a className="source" href={href} target={internal?undefined:'_blank'} rel={internal?undefined:'noreferrer'}>{children}{internal?<ArrowRight size={14} aria-hidden="true"/>:<ArrowUpRight size={14} aria-hidden="true"/>}</a>}
function Calculator(){const [value,setValue]=useState(500000);const assessed=value*.4;const total=assessed*.030899;
useEffect(()=>{const ctx=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:unknown)=>unknown}}).modelContext;if(!ctx)return;const lifecycle=new AbortController();try{Promise.resolve(ctx.registerTool({name:'set_example_home_value',title:'Explore the tax example',description:'Change the visible illustrative home value. Uses 2025 adopted rates with no exemptions or additional charges; not a 2026 bill estimate.',inputSchema:{type:'object',properties:{homeValue:{type:'number',minimum:100000,maximum:1500000,multipleOf:25000}},required:['homeValue'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input:unknown){const v=(input as {homeValue:number})?.homeValue;if(!Number.isFinite(v)||v<100000||v>1500000||v%25000!==0)throw new Error('Use a home value from 100000 to 1500000 in increments of 25000.');flushSync(()=>setValue(v));return {homeValue:v,assessedValue:v*.4,illustrativeAnnualTax:Math.round(v*.4*.030899*100)/100,ratesYear:2025,exemptions:0};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}return()=>lifecycle.abort();},[]);
return <div className="calculator"><div className="calc-controls"><div className="example-tag">Interactive example · 2025 rates</div><label id="value-label">What if the home’s market value is…</label><output className="home-value">{money(value)}</output><Slider min={100000} max={1500000} step={25000} value={[value]} onValueChange={v=>setValue(Array.isArray(v)?v[0]:v)} aria-labelledby="value-label" className="value-slider"/><div className="range-ends"><span>$100,000</span><span>$1,500,000</span></div><p>Move the slider. Watch the 40% rule and each tax component change together.</p><button className="text-button" onClick={()=>setValue(500000)}>Reset to the guide’s $500,000 example</button><div className="assessed-equation"><span>{money(value)} <b>× 40%</b></span><ArrowDown size={20}/><strong>{money(assessed)}</strong><span>Assessed value before exemptions</span></div></div><div className="calc-result"><div className="total-head"><span>Illustrative annual total</span><output aria-live="polite" aria-atomic="true">{money(total,true)}</output><p>Uses 2025 adopted rates, with no exemptions or additional charges. Not an estimate of your 2026 bill.</p></div><div className="tax-stack" role="img" aria-label="Tax shares in this example: schools about 55 percent, county about 29 percent, city about 16 percent."><span className="schools" style={{width:'55.3%'}}>55%</span><span className="county" style={{width:'28.7%'}}>29%</span><span className="city" style={{width:'16%'}}>16%</span></div><div className="tax-lines">{components.map(c=><div key={c.short}><span className={`dot ${c.color}`}/><div><b>{c.name}</b><small>{money(assessed)} × {c.rate.toFixed(3)} ÷ 1,000</small></div><strong>{money(assessed*c.rate/1000,true)}</strong></div>)}</div><p className="result-note"><Info size={17}/>Schools are the largest share in this example. Your own exemptions can change both the amounts and the shares.</p></div></div>}
function Help(){const [which,setWhich]=useState(0);const answerRef=useRef<HTMLDivElement>(null);const choose=(i:number)=>{setWhich(i);const el=answerRef.current;if(!el||!window.matchMedia('(max-width: 800px)').matches)return;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;requestAnimationFrame(()=>{if(el.getBoundingClientRect().top>window.innerHeight*.6)el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})})};const answers=[{title:'“Did my mortgage company pay my taxes?”',office:'Your mortgage servicer',body:'Confirm that your escrow account covers both the Fulton bill for county and school taxes and Roswell’s separate city bill. Check payment amounts and dates in your escrow history and the tax offices’ records. If a covered bill remains unpaid near its deadline, contact your servicer promptly; if it is late, contact the tax office too.',href:'#escrow',action:'See how escrow pays both bills'},{title:'“My home’s value looks wrong.”',office:'Fulton Board of Assessors',body:'Fulton sets one value that county, school, and city taxes all use. Review your assessment notice, then appeal within 45 days of its mailing. Follow the deadline printed on your notice.',phone:'404-612-6440',href:links.appeal,action:'Read the assessment appeal steps'},{title:'“My exemption is missing.”',office:'The office that grants it',body:'For county and school exemptions, contact Fulton’s Board of Assessors. Apply by April 1, or within the 45-day appeal window after your notice. City exemptions are separate: apply with Roswell Finance between January 1 and June 1, or call 770-641-3759.',phone:'404-612-6440',href:'#county',action:'Compare exemptions by authority'},{title:'“Why did my bill go up?”',office:'Check three things',body:'A higher value comes from Fulton’s assessors. A higher rate comes from the board that set it: the county commission, school board, or city council. A missing exemption comes from the office that grants it. Each chapter shows its rate history and who decided.',href:'#state',action:'Start with the authority chapters'},{title:'“I want to speak up about a rate.”',office:'The board proposing it',body:'A rate above the rollback rate requires three advertised public hearings. Comment there, or during public comment at a regular meeting. The timeline lists this year’s hearings, and the guide below explains how to read a proposal.',href:'#calendar',action:'See this year’s hearings'},{title:'“I need help with a bill or payment.”',office:'The office that sent the bill',body:'For the county and school bill, contact Fulton’s Tax Commissioner at 404-613-6100. For the separate Roswell city bill, call 770-641-3759 or email taxinfo@roswellgov.com.',phone:'404-613-6100',href:links.county,action:'Visit Fulton’s tax payment website'}];const a=answers[which];return <div className="help-layout"><div className="question-buttons" role="group" aria-label="Choose your tax question">{answers.map((a,i)=><button key={a.title} aria-pressed={which===i} onClick={()=>choose(i)}>{a.title}<ArrowRight size={20}/></button>)}</div><div className="help-answer" aria-live="polite" ref={answerRef}><span>Your starting point</span><h3>{a.office}</h3><p>{a.body}</p>{a.phone&&<a className="phone" href={`tel:${a.phone}`}><Phone size={18}/>{a.phone}</a>}<Source href={a.href}>{a.action}</Source></div></div>}
type ChapterGuide={asOf?:string;rates?:{label:string;mills:string;example:string;note:string;status?:string}[];rateNote?:string;rolesTitle?:string;roles?:{what:string;who:string;body:string}[];levers?:{problem:string;action:string;href:string;label:string}[];year?:[string,string][];contacts?:{office:string;role:string;phone:string;email?:string}[]};
const cityGuide:ChapterGuide={
 asOf:'October 1, 2026',
 rates:[
  {label:'2025 adopted',mills:'4.949',example:'$989.80',note:'4.049 operations + 0.900 debt service. The rate on your 2025 city bill.'},
  {label:'2026 rollback rate',mills:'5.232',example:'$1,046.40',note:'The rate that would collect about the same tax from existing homes as last year. A higher rate requires public notices and three hearings.'},
  {label:'2026 first proposal',mills:'7.732',example:'$1,546.40',note:'Advertised September 3. Replaced by a lower proposal on September 14.'},
  {label:'2026 revised proposal',mills:'5.900',example:'$1,180.00',note:'Advanced September 14. Replaced by the adopted rate on September 28.'},
  {label:'2026 adopted',mills:'5.232',example:'$1,046.40',note:'Adopted September 28: 4.049 operations + 1.183 debt service. Operations are unchanged; debt service rose by 0.283 mills.',status:'Adopted'}
 ],
 rateNote:'Examples use the guide’s $500,000 home ($200,000 assessed) with no exemptions. They are not a quote for your bill.',
 roles:[
  {what:'Your home’s value',who:'Fulton County Board of Assessors',body:'Roswell bills from the assessed value Fulton sets. The city does not value your home.'},
  {what:'The city tax rate',who:'Roswell City Council',body:'The mayor and six council members are all elected citywide, so every member votes on your rate.'},
  {what:'City exemptions',who:'Roswell Finance',body:'Senior, disabled veteran, and floating homestead exemptions reduce only the city portion.'},
  {what:'The city bill',who:'Roswell Finance',body:'Sent separately from the Fulton bill. The 2026 bill is expected before the end of October.'}
 ],
 levers:[
  {problem:'My home’s value looks wrong.',action:'Appeal to Fulton’s Board of Assessors within 45 days of your assessment notice. Roswell uses Fulton’s value, so the appeal goes to Fulton, not City Hall.',href:links.appeal,label:'Fulton’s appeal steps'},
  {problem:'I’m missing a city exemption.',action:'Apply with Roswell Finance between January 1 and June 1, at City Hall Suite G-20 or by email. The floating homestead exemption is automatic if you have Fulton’s homestead exemption.',href:links.city,label:'Roswell’s exemption rules'},
  {problem:'The city rate is too high.',action:'Council adopted the 2026 rate on September 28. Follow future millage hearings and council meetings to comment before the next rate is adopted.',href:'https://www.roswellgov.com/government/city-meetings-calendar/',label:'City meetings calendar'},
  {problem:'My city bill looks wrong.',action:'Contact Roswell Finance before the due date: 770-641-3759 or taxinfo@roswellgov.com, weekdays 8 a.m.–5 p.m.',href:'mailto:taxinfo@roswellgov.com',label:'Email Roswell Finance'},
  {problem:'I want a say over future rates.',action:'Every council seat represents the whole city. Follow council votes and vote in city elections.',href:'https://www.roswellgov.com/government/city-council/',label:'Meet the City Council'}
 ],
 year:[
  ['January 1','Fulton values your home as of this date.'],
  ['Jan 1 – Jun 1','Apply for city exemptions with Roswell Finance.'],
  ['When the notice arrives','Check your Fulton assessment notice. You have 45 days to appeal the value.'],
  ['September','2026: first reading Sept 14, town hall Sept 16, hearing Sept 21; council adopted 5.232 mills Sept 28.'],
  ['By end of October','Roswell expects to mail the separate 2026 city bill before the end of October.'],
  ['60 days later','Payment is due 60 days after billing, no later than December 31, 2026. Use the date on your bill.']
 ],
 contacts:[
  {office:'Roswell Finance',role:'City exemptions, city bills, and payments',phone:'770-641-3759',email:'taxinfo@roswellgov.com'},
  {office:'Fulton Board of Assessors',role:'Your home’s value and appeals',phone:'404-612-6440'}
 ]
};
const countyGuide:ChapterGuide={
 asOf:'September 25, 2026',
 rates:[
  {label:'2025 adopted',mills:'8.870',example:'$1,774.00',note:'The 2025 county rate. Fulton’s temporary 2026 bills also use it until the 2026 rate is set.'},
  {label:'2026 rollback rate',mills:'8.822',example:'$1,764.40',note:'The rate that would collect about the same tax from existing homes as last year. A higher rate requires public notices and three hearings.'},
  {label:'2026 tentative rate',mills:'8.870',example:'$1,774.00',note:'Same as 2025, but 0.048 mills above rollback, so Georgia treats it as a 0.54% tax increase. Hearings Sept 30 and Oct 7.',status:'Proposed'}
 ],
 rateNote:'Examples use the guide’s $500,000 home ($200,000 assessed) with no exemptions. They are not a quote for your bill.',
 roles:[
  {what:'Your home’s value',who:'Fulton County Board of Assessors',body:'Sets your value as of January 1. County, school, and Roswell taxes all start from it.'},
  {what:'The county tax rate',who:'Board of Commissioners',body:'Seven members: six elected by district and a chair elected countywide.'},
  {what:'County exemptions',who:'Fulton County Board of Assessors',body:'Basic homestead plus age, income, veteran, and disability exemptions. The board applies the most beneficial one you qualify for.'},
  {what:'The Fulton bill',who:'Fulton County Tax Commissioner',body:'Sends and collects one bill for county and school taxes. The city bill is separate.'}
 ],
 levers:[
  {problem:'My home’s value looks wrong.',action:'Appeal within 45 days of your assessment notice. The 2026 deadline for most owners was July 31 unless your notice shows another date. You can appeal the value, not the tax amount.',href:links.appeal,label:'Fulton’s appeal steps'},
  {problem:'I’m missing a county exemption.',action:'Apply with the Board of Assessors by April 1, or since 2026 within the 45-day appeal window after your notice. April 1 filers also qualified for the 2026 state relief grant.',href:links.assessor,label:'Fulton Board of Assessors'},
  {problem:'The county rate is too high.',action:'Speak at the 2026 rate hearings: September 30 at 10 a.m. and 6 p.m., and October 7 at 10 a.m., at 141 Pryor Street, Atlanta, or by Zoom.',href:'https://www.fultoncountyga.gov/News/2026/09/23/Notice-of-Property-Tax-Increase',label:'Fulton’s hearing notice'},
  {problem:'My Fulton bill looks wrong.',action:'Call the Tax Commissioner at 404-613-6100. Pay the 2026 temporary bill by October 15 even while an appeal is pending; a revised bill or refund follows if needed.',href:links.county,label:'Fulton bills and payments'},
  {problem:'I want a say over future rates.',action:'Find your district commissioner. Large parts of Roswell are in District 2, but check your address. The chair represents the whole county, and your district doesn’t change your rate.',href:'https://www.fultoncountyga.gov/Commission-District-Finder',label:'Commission District Finder'}
 ],
 year:[
  ['January 1','Fulton values your home as of this date.'],
  ['By April 1','Apply for exemptions. Since 2026, you can also apply during the 45-day appeal window.'],
  ['June','Assessment notices arrive. You have 45 days to appeal; in 2026, usually by July 31.'],
  ['August 15','2026 temporary bills mailed, using preliminary values and 2025 rates.'],
  ['Sept 30 & Oct 7','Hearings on the tentative 2026 county rate.'],
  ['October 15','Fulton bill due. A revised bill or refund follows if the final rates differ.']
 ],
 contacts:[
  {office:'Fulton Board of Assessors',role:'Your value, exemptions, and appeals',phone:'404-612-6440',email:'boa@fultoncountyga.gov'},
  {office:'Fulton Tax Commissioner',role:'The county and school bill, and payments',phone:'404-613-6100'}
 ]
};
const schoolsGuide:ChapterGuide={
 asOf:'September 25, 2026',
 rates:[
  {label:'2025 adopted',mills:'17.080',example:'$3,416.00',note:'Kept steady for 2025 by a unanimous vote on August 19, 2025. Fulton’s temporary 2026 bills also use it.'},
  {label:'2026 tentative rate',mills:'18.080',example:'$3,616.00',note:'Tentatively approved August 20: 1 mill, or 5.85%, above the current rate. Three public meetings come before the final vote.',status:'Proposed'}
 ],
 rateNote:'Examples use the guide’s $500,000 home ($200,000 assessed) with no exemptions. The board’s summaries do not publish a 2026 rollback rate or hearing dates; check its meeting calendar.',
 roles:[
  {what:'Your home’s value',who:'Fulton County Board of Assessors',body:'The same value used for county and city taxes. There is no separate school assessment.'},
  {what:'The school tax rate',who:'Fulton County Board of Education',body:'Seven members, each elected by district. Separate from the county commission and City Hall.'},
  {what:'School exemptions',who:'Fulton County Board of Assessors',body:'Includes senior exemptions of 25% at 65 and 50% at 70 that reduce only the school portion.'},
  {what:'The school bill',who:'Fulton County Tax Commissioner',body:'School tax is on the Fulton bill with county tax, not on the Roswell city bill.'}
 ],
 levers:[
  {problem:'My home’s value looks wrong.',action:'Appeal to Fulton’s Board of Assessors within 45 days of your assessment notice. One appeal covers the value used for school tax too.',href:links.appeal,label:'Fulton’s appeal steps'},
  {problem:'I’m missing a school exemption.',action:'The senior school exemptions apply automatically at 65 or 70 if you have had a Fulton homestead exemption for 5 of the last 6 years, with no income limit. If one is missing, contact the Board of Assessors. Apply for other exemptions by April 1 or within the 45-day appeal window.',href:'https://www.fultoncountyga.gov/News/2026/03/16/Postcards-Notify-Homeowners-of-New-Tax-Exemption',label:'Fulton’s senior exemption notice'},
  {problem:'The school rate is too high.',action:'Comment at one of the three public meetings on the 18.08 tentative rate, or during public comment at a regular board meeting. Check sign-in rules first.',href:'https://www.fultonschools.org/fcs-board-of-education/board-resources/addressing-the-board',label:'Addressing the board'},
  {problem:'My Fulton bill looks wrong.',action:'Call the Tax Commissioner at 404-613-6100. The 2026 temporary bill is due October 15; a revised bill or refund follows if needed.',href:links.county,label:'Fulton bills and payments'},
  {problem:'I want a say over future rates.',action:'Find your school board district. Your board member is elected by district; your assigned school does not change your rate.',href:'https://experience.arcgis.com/experience/339ad3a68f144abc824bcfb98bd0a5eb',label:'School board district map'}
 ],
 year:[
  ['January 1','Fulton values your home as of this date.'],
  ['By April 1','Apply for exemptions. Since 2026, you can also apply during the 45-day appeal window.'],
  ['June','Assessment notices arrive. You have 45 days to appeal; in 2026, usually by July 31.'],
  ['August 15','2026 temporary bills mailed with the 2025 school rate of 17.08.'],
  ['August 20','Board tentatively approved 18.08 mills. Three public meetings follow.'],
  ['October 15','Fulton bill due. A revised bill or refund follows if the final rates differ.']
 ],
 contacts:[
  {office:'Fulton Board of Assessors',role:'Your value, school exemptions, and appeals',phone:'404-612-6440',email:'boa@fultoncountyga.gov'},
  {office:'Fulton Tax Commissioner',role:'The county and school bill, and payments',phone:'404-613-6100'}
 ]
};
const stateGuide:ChapterGuide={
 rolesTitle:'What Georgia decides for every bill',
 roles:[
  {what:'How value becomes taxable',who:'Georgia law',body:'Homes are taxed on 40% of fair market value. Fulton’s assessors apply the rule; they don’t choose it.'},
  {what:'Statewide exemptions',who:'Georgia law',body:'A $2,000 homestead exemption from county and school taxes, plus senior, veteran, and HB 581 “floating” exemptions, which limit how fast a homestead’s taxable value can rise. Since 2026, you must report when you stop qualifying or face a 50% penalty.'},
  {what:'Limits on rate increases',who:'Taxpayer’s Bill of Rights',body:'The rollback rate offsets rising values, so it would collect about the same tax from existing property as last year. A local rate above it requires advertised notices, a press release, and three public hearings.'},
  {what:'Your appeal rights',who:'Georgia law',body:'45 days to appeal. The assessors must prove a value change, and you can recover costs if the final value is 85% or less of theirs.'}
 ],
 levers:[
  {problem:'I disagree with my assessment.',action:'Georgia gives you 45 days from your notice to appeal to the county Board of Equalization, with a further appeal to Superior Court, or to choose arbitration. Since 2026, you can also apply for homestead exemptions in that window.',href:'https://dor.georgia.gov/property-tax-real-and-personal-property-faq',label:'Georgia’s appeal basics'},
  {problem:'A local rate rose above rollback.',action:'State law requires three advertised public hearings, one starting between 6 and 7 p.m. Each local chapter lists its 2026 hearings.',href:'https://dor.georgia.gov/property-taxpayers-bill-rights',label:'Taxpayer’s Bill of Rights'},
  {problem:'I want the 2026 relief grant.',action:'A one-time grant cuts $18,000 from a homestead’s assessed value for county, school, and city taxes, except bond levies. It requires a homestead filing by April 1, 2026, and shows as savings on your bill, not a check.',href:'https://dor.georgia.gov/2026-property-tax-relief-grant',label:'2026 relief grant'},
  {problem:'A local government skipped HB 581.',action:'Fulton County kept HB 581’s inflation cap. Fulton County Schools opted out and uses its own cap. A 2025 law lets governments that opted out opt back in; ask at their budget hearings. Ask Roswell Finance which floating exemption applies to city tax.',href:'https://billtracker.gacities.com/legislation/69431',label:'HB 92 opt-out changes'},
  {problem:'A state rule seems unfair.',action:'Contact your state representative and senator. The General Assembly changed property tax law in 2024, 2025, and 2026.',href:'https://openstates.org/find_your_legislator/',label:'Find your legislators'}
 ],
 year:[
  ['January','The General Assembly meets and can change property tax law.'],
  ['January 1','Your home’s value and homestead status are set as of this date.'],
  ['April 1','Homestead filing deadline for the 2026 relief grant.'],
  ['By July 1','Assessment notices must be mailed. You have 45 days to appeal or apply for exemptions.'],
  ['Before rates are set','A rate above rollback needs three advertised hearings.'],
  ['On your bill','Each authority’s exemption savings are listed, along with the relief grant.']
 ]
};
const authorityDetails=[
 {...stateGuide,id:'state',name:'State of Georgia',short:'State',color:'state',icon:Scale,role:'Georgia doesn’t send you a property tax bill. It writes the rules every local bill follows: how your home is valued, which exemptions exist, how rates can rise, and how you can appeal.',rate:'0',rateLabel:'mills · no statewide levy since January 1, 2016',decision:'No state rate. The General Assembly and Governor write the rules.',bill:'No state property tax bill.',billLink:links.mills,billAction:'Georgia’s property tax basics',details:'The Department of Revenue oversees how counties apply state law. Local boards set your value and rates within those rules.',primary:[{href:links.exemption,label:'Statewide homestead exemptions',body:'The $2,000 statewide exemption, plus senior and disabled veteran exemptions.'},{href:'https://dor.georgia.gov/property-taxpayers-bill-rights',label:'Property Taxpayer’s Bill of Rights',body:'Rollback rates, required hearings, and your rights when you appeal.'}],resources:[{href:'https://gov.georgia.gov/document/2026-signed-legislation/sb-566/download',label:'SB 566 (2026)',body:'Moves the homestead deadline to the end of the appeal window, adds the ineligibility penalty, and changes notices and bills.'},{href:'https://www.accg.org/links/HB%20581%20FAQs-FINAL.pdf',label:'HB 581 (2024) explained',body:'How the floating homestead exemption caps value growth at inflation, and how local opt-outs worked.'},{href:'https://dor.georgia.gov/2026-property-tax-relief-grant',label:'2026 Property Tax Relief Grant',body:'The one-time $18,000 assessed-value reduction for homesteads.'},{href:'https://www.legis.ga.gov/members/house',label:'Georgia General Assembly',body:'Follow bills and members. Property tax changes usually pass during the January–spring session.'}]},
 {...countyGuide,id:'county',name:'Fulton County',short:'County',color:'county',icon:Landmark,role:'The county estimates your property’s value and provides courts, elections, libraries, jail operations, and human services.',rate:'8.870',decision:'Board of Commissioners',bill:'On your Fulton bill, together with school tax.',billLink:links.county,billAction:'View Fulton bills and payments',details:'The Board of Assessors handles property records, assessments, and appeals. The Tax Commissioner sends and collects the Fulton bill.',services:{href:'https://www.fultoncountyga.gov/services',label:'Explore all Fulton County services'},primary:[{href:links.assessor,label:'Visit the Fulton Board of Assessors',body:'Start here for property assessments, records, exemptions, and appeal information.'},{href:links.records,label:'Find your property record',body:'Check your market value, assessed value, exemptions, and tax year.'},{href:links.appeal,label:'Review assessment appeal steps',body:'Use the deadline on your assessment notice; appeals are generally due within 45 days of mailing.'}],resources:[{href:'https://www.fultoncountyga.gov/News/2026/09/23/Notice-of-Property-Tax-Increase',label:'2026 notice of property tax increase',body:'The tentative rate, the rollback rate, and the September 30 and October 7 hearing times.'},{href:'https://www.fultoncountyga.gov/commissioners/clerk-to-the-commission/public-notices',label:'County notices and hearings',body:'Look for proposed millage and budget hearings, special meetings, and updated notices.'},{href:'https://fultoncountyga.gov/commissioners/agenda-minutes',label:'County proposals and decisions',body:'Open meeting records and attachments, then return after the meeting for the recorded action.'}]},
 {...schoolsGuide,id:'schools',name:'Fulton County Schools',short:'Schools',color:'schools',icon:GraduationCap,role:'Fulton County Schools is legally a school district: a separate government with its own tax rate. School taxes support the whole system, not just the school assigned to your address.',rate:'17.080',decision:'Elected Board of Education',bill:'On your Fulton bill, together with county tax.',billLink:links.county,billAction:'View Fulton bills and payments',details:'The school board sets its own rate and budget. Your school board election district chooses a representative; your attendance zone does not add a separate tax.',primary:[{href:links.assessor,label:'Check school assessment information',body:'Fulton’s Board of Assessors is the starting point for county and school assessment and exemption questions.'}],resources:[{href:'https://news.fultonschools.org/details/~board/board-bulletin/post/board-bulletin-for-8212026',label:'2026 tentative millage approval',body:'The board’s summary of the August 20 vote on 18.08 mills and the reasons given for it.'},{href:'https://simbli.eboardsolutions.com/SB_Meetings/SB_MeetingListing.aspx?S=36031609',label:'School board proposals and decisions',body:'Open upcoming work sessions or board meetings for budget, millage, and policy materials.'},{href:'https://www.fultonschools.org/fcs-board-of-education/board-services/board-policy-updates',label:'School policy updates',body:'Follow the policy process and links to drafts, the manual, and meeting records.'},{href:'https://www.fultonschools.org/fcs-board-of-education/board-services',label:'Board Services and public comment',body:'Check the current registration instructions and contact details before a meeting.'}]},
 {...cityGuide,id:'city',name:'City of Roswell',short:'City',color:'city',icon:TreePine,role:'The city provides police, fire protection, parks, roads, and zoning within Roswell.',rate:'5.232',rateLabel:'mills · adopted 2026 rate, September 28',decision:'Roswell City Council',bill:'A separate bill sent by the City of Roswell.',billLink:links.city,billAction:'Find Roswell payment information',details:'Roswell sets its own rate and offers city exemptions through its Finance office. Its exemptions may apply only to part of the city rate.',services:{href:'https://www.roswellgov.com/services/',label:'Explore all City of Roswell services'},primary:[{href:links.city,label:'City rates, exemptions, and billing',body:'Check city millage, exemption rules, and the current billing information.'}],resources:[{href:links.adoption,label:'2026 adopted city rate',body:'The city’s September 30 announcement confirms 5.232 mills, the operations and debt components, and the updated bill schedule.'},{href:'https://www.appenmedia.com/alpharetta_roswell/roswell-council-scales-back-proposed-tax-rate-increase/article_8a43186a-b960-40e5-b693-300cbd5f85ce.html',label:'How the 2026 proposal changed',body:'News coverage of the September 14 vote that replaced the 7.732-mill proposal with 5.9 mills.'},{href:'https://www.roswellgov.com/government/city-meetings-calendar/',label:'City meetings, proposals, and decisions',body:'Find council and committee meetings and follow agendas, briefs, and minutes for supporting material.'},{href:links.city,label:'City tax-rate information',body:'Look for millage information and announced opportunities to comment on a proposed rate.'},{href:'https://www.roswellgov.com/government/departments-division/community-development/planning-zoning/planning-zoning-public-notices/',label:'Active zoning notices',body:'Explore the city’s notices and map for proposed zoning, use, and variance changes.'}]}
];
function ReferenceTier({id,label,children}:{id:string;label:string;children:React.ReactNode}){
  const [open,setOpen]=useState(false);
  return <div className="chapter-tier tier-reference" data-open={open||undefined}>
    <button type="button" className="tier-toggle" aria-expanded={open} aria-controls={`${id}-reference`} onClick={()=>setOpen(o=>!o)}>
      <span>{label}</span><ChevronDown size={20} aria-hidden="true"/>
    </button>
    <div id={`${id}-reference`} className="tier-body">{children}</div>
  </div>;
}
const sectionNames:[string,string][]=[['basics','Overview'],['state','State'],['county','County'],['schools','Schools'],['city','City'],['math','Calculator'],['escrow','Escrow'],['calendar','Dates'],['help','Help']];
function useCurrentSection(){
  const [current,setCurrent]=useState<string|null>(null);
  useEffect(()=>{let frame=0;const update=()=>{frame=0;let found:string|null=null;for(const [id] of sectionNames){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=120)found=id;}setCurrent(found);};const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('hashchange',onScroll);return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('hashchange',onScroll);cancelAnimationFrame(frame);};},[]);
  return current;
}
function SectionPill({current}:{current:string|null}){
  const name=sectionNames.find(([id])=>id===current)?.[1];
  return <span className={`section-pill${name?'':' is-empty'}`} data-section={current??undefined} aria-hidden={!name}>{name&&<><span className="sr-only">Now reading: </span>{name}</>}</span>;
}
const tabs=[{id:'county',label:'County',icon:Landmark},{id:'schools',label:'Schools',icon:GraduationCap},{id:'city',label:'City',icon:TreePine},{id:'math',label:'Calculator',icon:CalculatorIcon}];
const moreLinks=[{href:'#basics',id:'basics',label:'Overview',icon:House},{href:'#state',id:'state',label:'State of Georgia',icon:Scale},{href:'#escrow',id:'escrow',label:'Paying through escrow',icon:Wallet},{href:'#calendar',id:'calendar',label:'2026 dates',icon:CalendarDays},{href:'#help',id:'help',label:'Find the right office',icon:Phone}];
function TabBar({current}:{current:string|null}){
  const sheetRef=useRef<HTMLDialogElement>(null);
  const [open,setOpen]=useState(false);
  const inMore=moreLinks.some(l=>l.id===current);
  const close=()=>sheetRef.current?.close();
  useEffect(()=>{const d=sheetRef.current;if(!d)return;const onClose=()=>setOpen(false);const onScrim=(e:MouseEvent)=>{if(e.target===d)d.close();};d.addEventListener('close',onClose);d.addEventListener('click',onScrim);return()=>{d.removeEventListener('close',onClose);d.removeEventListener('click',onScrim);};},[]);
  return <>
    <nav className="tab-bar" aria-label="Main">
      {tabs.map(t=><a key={t.id} href={`#${t.id}`} className={`tab tab-${t.id}`} aria-current={current===t.id?'location':undefined}><span className="tab-icon"><t.icon size={22} strokeWidth={1.75} aria-hidden="true"/></span><span>{t.label}</span></a>)}
      <button type="button" className="tab tab-more" aria-haspopup="dialog" aria-expanded={open} aria-controls="more-sheet" data-active={inMore||undefined} onClick={()=>{const d=sheetRef.current;if(!d)return;d.showModal();setOpen(true);}}><span className="tab-icon"><Ellipsis size={22} strokeWidth={1.75} aria-hidden="true"/></span><span>More</span></button>
    </nav>
    <dialog id="more-sheet" className="more-sheet" ref={sheetRef} aria-label="More sections">
      <ul>
        {moreLinks.map(l=><li key={l.href}><a href={l.href} onClick={close} aria-current={current===l.id?'location':undefined}><l.icon size={21} strokeWidth={1.75} aria-hidden="true"/><span>{l.label}</span><ChevronRight size={18} aria-hidden="true"/></a></li>)}
      </ul>
    </dialog>
  </>;
}
function AuthorityChapters() {
  return <div className="authority-chapters">
    {authorityDetails.map((entry,index) => {
      const a: typeof entry & ChapterGuide & {services?: {href: string; label: string}; rateLabel?: string} = entry;
      const next = authorityDetails[index + 1];
      return <section id={a.id} key={a.id} className={`authority-chapter authority-${a.color}`} aria-labelledby={`${a.id}-heading`}>
        <div className="section">
          <div className="chapter-heading">
            <div className="chapter-title">
              <a.icon size={34} strokeWidth={1.5}/>
              <h2 id={`${a.id}-heading`}>{a.name}</h2>
              <p>{a.role}</p>
              {a.services && <Source href={a.services.href}>{a.services.label}</Source>}
            </div>
            <div className="chapter-rate">
              <strong>{a.rate}</strong>
              <span>{a.rateLabel ?? 'mills · adopted 2025 rate used in the example'}</span>
              {a.rate !== '0' && <Source href="#math">See how a rate becomes tax</Source>}
            </div>
          </div>
          <div className="chapter-tier tier-understand">
            {a.roles && <div className="chapter-block">
              <div className="block-heading"><h3>{a.rolesTitle ?? `Who decides each part of your ${a.short.toLowerCase()} tax`}</h3></div>
              <dl className="who-did-what">{a.roles.map(r => <div key={r.what}>
                <dt>{r.what}</dt><dd><b>{r.who}</b><p>{r.body}</p></dd>
              </div>)}</dl>
            </div>}
            {a.rates && <div className="chapter-block">
              <div className="block-heading"><h3>Your {a.short.toLowerCase()} rate, year to year</h3><span>As of {a.asOf}</span></div>
              <div className="rate-history">{a.rates.map(r => <div key={r.label} className={r.status ? 'is-proposed' : undefined}>
                <span>{r.label}{r.status && <b className="status-tag">{r.status}</b>}</span>
                <strong>{r.mills}<small>mills</small></strong>
                <em>{r.example}<small>example tax</small></em>
                <p>{r.note}</p>
              </div>)}</div>
              <p className="block-note">{a.rateNote}</p>
            </div>}
          </div>
          <div className="chapter-tier tier-act">
            {a.levers && <div className="chapter-block">
              <div className="block-heading"><h3>What you can do</h3></div>
              <div className="push-back">{a.levers.map(l => <div key={l.problem}>
                <h4>{l.problem}</h4><p>{l.action}</p><Source href={l.href}>{l.label}</Source>
              </div>)}</div>
            </div>}
            {a.contacts && <div className="chapter-block">
              <div className="block-heading"><h3>Who to contact</h3></div>
              <div className="chapter-contacts">{a.contacts.map(c => <div key={c.office}>
                <b>{c.office}</b><p>{c.role}</p>
                <a className="phone" href={`tel:${c.phone}`}><Phone size={18}/>{c.phone}</a>
                {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
              </div>)}</div>
            </div>}
          </div>
          <ReferenceTier id={a.id} label={`${a.short} dates and official links`}>
            {a.year && <div className="chapter-block chapter-year">
              <div className="block-heading"><h3>Your {a.short.toLowerCase()} tax year</h3></div>
              <ol>{a.year.map(([when, what]) => <li key={when}><span>{when}</span><p>{what}</p></li>)}</ol>
            </div>}
            <div className="chapter-grid">
              <div>
                <h3>Assessments, rates, and bills</h3>
                <dl className="chapter-facts">
                  <div><dt>Rate set by</dt><dd>{a.decision}</dd></div>
                  <div><dt>Where you pay</dt><dd>{a.bill}</dd></div>
                </dl>
                <p>{a.details}</p>
                <Source href={a.billLink}>{a.billAction}</Source>
                <div className="chapter-primary">{a.primary.map(item => <div key={item.label}>
                  <Source href={item.href}>{item.label}</Source><p>{item.body}</p>
                </div>)}</div>
              </div>
              <div>
                <h3>Follow proposals and decisions</h3>
                <p className="chapter-context">Use the latest official notice or meeting record to distinguish a proposal from an adopted change.</p>
                <div className="chapter-resources">{a.resources.map(item => <div key={item.label}>
                  <Source href={item.href}>{item.label}</Source><p>{item.body}</p>
                </div>)}</div>
                <Source href="#changes">How to read a public proposal</Source>
              </div>
            </div>
          </ReferenceTier>
          <nav className="chapter-navigation" aria-label={`${a.short} chapter navigation`}>
            <a href="#basics">Back to the overview</a>
            <a href={next ? `#${next.id}` : '#math'}>{next ? `Next: ${next.name}` : 'Next: how the taxes add up'}<ArrowRight size={18} aria-hidden="true"/></a>
          </nav>
        </div>
      </section>;
    })}
  </div>;
}
export default function Home(){const current=useCurrentSection();return <><a href="#basics" className="skip">Skip to guide</a><header className="header"><a className="brand" href="#"><House size={24}/><span>Roswell, <b>explained.</b></span></a><nav aria-label="Guide sections"><a href="#state">State</a><a href="#county">County</a><a href="#schools">Schools</a><a href="#city">City</a><a href="#math">How taxes add up</a></nav><SectionPill current={current}/></header><main>
<section className="hero"><div className="hero-copy"><h1>Your home.<br/>Your taxes.<br/><span>Now it makes sense.</span></h1><p>Three taxing authorities. Two bills. One home.<br/>Let’s make your Roswell property taxes a little less mysterious.</p><a className="cta" href="#basics">Start with the big picture <ArrowDown size={19}/></a><small>An independent homeowner’s guide · Not a government website</small></div><div className="hero-visual"><img src="/home.webp" alt="A tactile paper illustration of a white suburban house framed by mature trees" width="1536" height="1024" fetchPriority="high"/><div className="home-label"><House size={19}/>Your home in Roswell</div><div className="home-caption"><span className="county">County</span><span className="schools">Schools</span><span className="city">City</span></div><p>One address. Three public-service teams.</p></div></section>
<nav className="quick-route" aria-label="Tax tools and help"><span>Have a specific question?</span><a href="#math">Try the calculator <ArrowRight size={16}/></a><a href="#calendar">See the 2026 timeline <ArrowRight size={16}/></a><a href="#help">Find the right office <ArrowRight size={16}/></a></nav>
<section id="basics" className="section"><h2>You live in a city.<br/>And a county. At the same time.</h2><p className="intro">Living in Roswell doesn’t take you out of Fulton County. The city has its own government; it isn’t a county department. Georgia sets the rules all three authorities follow; start there, then explore each authority’s rates, bills, and decisions.</p><div className="state-note"><Landmark size={27}/><div><h3>Georgia writes the rules.</h3><p>The state sets the legal framework for assessments, exemptions, and appeals. Its statewide property-tax levy ended in 2016. You vote for your state representative and senator.</p></div><Source href="#state">Explore the state chapter</Source></div><div className="authority-list">{components.map(c=><article key={c.short} className={c.color}><c.icon size={30} strokeWidth={1.5}/><h3>{c.name}</h3><p>{c.services}</p><div className="decision"><span>Who sets this rate?</span><b>{c.decision}</b></div><div className="decision"><span>You vote for</span><b>{c.vote}</b></div><span className="bill-label"><FileText size={16}/>{c.bill}</span><a className="authority-open" href={`#${c.color}`}>Explore {c.short.toLowerCase()} <ArrowRight size={17}/></a></article>)}</div><div className="overview-context"><p><b>Voting districts decide who represents you, not how much you pay.</b> Each chapter shows its adopted 2025 rate and 2026 updates, including Roswell’s adopted city rate. A <b>mill</b> means $1 of tax per $1,000 of taxable value.</p></div></section>
<AuthorityChapters/>
<section id="math" className="math-section"><div className="section"><h2>From “what it’s worth”<br/>to “what you owe.”</h2><p className="intro">County, school, and city taxes use the same basic calculation. Start with your home’s market value, then follow each part through the example.</p><ol className="math-steps"><li><span className="step-number">1</span><h3>Take 40% of the value.</h3><p>Fulton’s assessors estimate what your home is worth. For a typical Georgia home, 40% of that is its <b>assessed value.</b></p><span className="mini-formula">$500,000 → $200,000</span></li><li><span className="step-number">2</span><h3>Subtract exemptions.</h3><p><b>Exemptions</b>, and for 2026 the state’s relief grant, can reduce the value used for taxes. The remaining <b>taxable value</b> can differ for county, school, and city taxes.</p><span className="mini-formula">Assessed value − exemptions</span></li><li><span className="step-number">3</span><h3>Apply each tax rate.</h3><p>A <b>mill</b> means $1 of tax for every $1,000 of taxable value. Calculate each component separately, then add them.</p><span className="mini-formula">Taxable value × mills ÷ 1,000</span></li></ol><Calculator/><div className="property-lookup"><div><h3>Where do I find my home’s values?</h3><p>Look up your address in Fulton’s property records and check the tax year. Find the county’s market value and assessed value. To explore the example above, use the <b>market value</b>; the calculator takes 40% automatically.</p></div><div className="lookup-links"><Source href={links.records}>Find my property on qPublic</Source><small>Fulton property records · hosted by Schneider Geospatial</small><small>Links open in a new tab.</small></div></div><div className="exemption-note"><h3>So where do exemptions fit?</h3><p>A homestead exemption is relief for a qualifying primary residence. For a simple illustration, reducing the county’s taxable value by $20,000 at 8.870 mills lowers that component by <b>$177.40</b>. That is an example, not a statement that you qualify.</p><p>Each authority has its own exemptions and deadlines. See the <a href="#county">County</a>, <a href="#schools">Schools</a>, and <a href="#city">City</a> chapters for who grants them and how to apply.</p><Source href={links.exemption}>Understand homestead exemptions</Source></div></div></section>
<section className="why-section"><div className="section why-grid"><h2>Same rate.<br/>Bigger bill?<br/><span>It can happen.</span></h2><div><p className="intro">A tax rate is only half the equation. If your taxable value rises, your bill can rise even when the rate stays the same.</p><div className="same-rate"><div><span>Taxable value</span><b>$180,000</b><small>× 10 mills</small><strong>$1,800 tax</strong></div><ArrowRight size={26}/><div><span>Taxable value</span><b>$200,000</b><small>× 10 mills</small><strong>$2,000 tax</strong></div></div><small>Illustration only: a hypothetical unchanged 10-mill rate.</small><p className="budget-note">Each authority adopts a budget, considers other revenue, and sets its rate. The <b>tax digest</b> is the combined taxable property base used in this process.</p></div></div></section>
<section id="escrow" className="section escrow-section" aria-labelledby="escrow-heading">
  <h2 id="escrow-heading">Paying through your mortgage?<br/>Your taxes may already be in the payment.</h2>
  <p className="intro">If your mortgage includes an escrow account for property taxes, part of your monthly payment goes into that account. Your <b>mortgage servicer—the company you send your mortgage payments to—</b> holds the money and pays the covered tax bills when they come due. Escrow commonly pays homeowners insurance too.</p>
  <Source href={links.escrow}>How escrow works</Source>
  <div className="escrow-flow">
    <h3>Three taxes. Two bills. One account to check.</h3>
    <div className="escrow-origin"><House size={26} aria-hidden="true"/><div><strong>Your monthly mortgage payment</strong><p>The escrow portion sets aside your money for covered taxes and insurance.</p></div></div>
    <div className="escrow-junction"><ArrowDown size={24} aria-hidden="true"/><strong>Your escrow account</strong><span>Your servicer pays the covered bills when due.</span></div>
    <div className="escrow-branches">
      <div className="escrow-bill escrow-fulton"><FileText size={25} aria-hidden="true"/><h4>Fulton bill</h4><p>Payment to Fulton County’s Tax Commissioner</p><div className="escrow-tax-labels"><span className="county">Fulton County tax</span><span className="schools">Fulton County Schools tax</span></div><Source href={links.county}>Check your Fulton bill</Source></div>
      <div className="escrow-bill escrow-city"><FileText size={25} aria-hidden="true"/><h4>Roswell bill</h4><p>Payment to the City of Roswell</p><div className="escrow-tax-labels"><span className="city">City of Roswell tax</span></div><Source href={links.city}>Check your city bill</Source></div>
    </div>
    <p className="escrow-check">Confirm with your servicer that <b>both bills are included</b> in your escrow account. Check the expected payment amounts and dates on your escrow statement.</p>
  </div>
  <div className="escrow-reading">
    <div><h3>Why can my monthly payment go up?</h3><p>Higher property taxes or insurance costs can increase the escrow portion of your mortgage payment—even on a fixed-rate loan.</p><p>Your servicer reviews the account each year. If it collected too little, your payment may include both a higher amount for future bills and an amount to make up an <b>escrow shortage</b>. Your escrow statement explains the calculation.</p><Source href={links.escrowReview}>Understanding escrow reviews</Source></div>
    <div><h3>A tax bill arrived. What should I do?</h3><p>Before paying it yourself, confirm whether your servicer will pay it from escrow. Ask whether it needs a copy, and check that the payment appears in your escrow history and the tax office’s records.</p><p>If a covered bill remains unpaid near its deadline, contact your servicer promptly. If the payment is late, contact the tax office too.</p><Source href={links.escrowHelp}>Help with escrow problems</Source></div>
  </div>
  <p className="escrow-direct"><b>No escrow for property taxes?</b> You’ll need to budget for and pay both bills directly.</p>
</section>
<section id="calendar" className="calendar-section"><div className="section"><div className="calendar-heading"><h2>Your property-tax year,<br/>one step at a time.</h2><div className="snapshot"><CalendarDays size={20}/><span>The 2026 schedule · city entries checked October 1<br/><b>County and school entries checked September 25. The dates on your own notice and bill come first.</b></span></div></div><p className="annual-intro">Three taxing authorities, the state’s rules, and two bills. Here is how 2026 fits together in date order. Select a tag to open that chapter.</p><div className="timeline">{yearTimeline.map(([when,who,title,body])=><article key={when+title}><span className="timeline-date">{when}</span><span className={`timeline-dot ${who}`} aria-hidden="true"/><div>{who==='all'?<span className="timeline-tag all">All authorities</span>:<a className={`timeline-tag ${who}`} href={`#${who}`}>{timelineLabels[who]}</a>}<h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>
<section id="help" className="section"><h2>The right question.<br/>The right office.</h2><p className="intro">Start with what you’re trying to solve. Different offices handle values, rates, and payments.</p><Help/><div id="changes" className="proposal-guide"><h3>Reading a public proposal</h3><p>Each authority chapter links to its meetings and notices. Here is how to read what you find there.</p><div className="proposal-reading"><ol><li><b>Open the proposal.</b> An agenda lists what may be discussed. Read the attached draft, staff report, or rate notice for the actual change. Useful search words include “millage,” “budget,” “ordinance,” “amendment,” and “policy.”</li><li><b>Find the chance to comment.</b> A public hearing is an opportunity for input under that body’s rules. Check the meeting date, any registration deadline, and how comments are accepted. Recheck for updates or cancellations.</li><li><b>Check the outcome.</b> “Proposed,” “draft,” or “first reading” does not by itself mean adopted. Look for the recorded vote and final text, then check the effective date. Approval and the date a rule starts may differ.</li></ol></div><p className="changes-note">Check the date and status on the source page; an older proposal may already have been adopted, changed, or withdrawn.</p></div></section>




<section className="takeaway section"><h2>You don’t need to be a tax expert.</h2><p>Just keep three things straight: <b>who sets the value, who sets the rate, and who sent the bill.</b> That’s the foundation for understanding what you owe—and knowing where to ask.</p></section>
<footer className="section footer"><a className="brand" href="#"><House size={22}/><span>Roswell, <b>explained.</b></span></a><p>An independent educational guide for Roswell homeowners. Not a government website. It began from the <i>Roswell Property Tax Guide</i> of September 8, 2026, and links to official sources for current details. The calculator uses 2025 adopted rates, and dated references are historical. Check your own notices and bills before acting.</p><Accordion><AccordionItem value="sources"><AccordionTrigger>Source notes & official references</AccordionTrigger><AccordionContent keepMounted><div className="sources-grid">{[[links.escrow,'CFPB: how mortgage escrow works'],[links.escrowReview,'CFPB: escrow reviews and shortages'],[links.escrowHelp,'CFPB: help with escrow problems'],[links.records,'Fulton property records: qPublic (Schneider Geospatial)'],[links.assessor,'Fulton Board of Assessors: official starting point'],[links.mills,'Georgia: millage and assessment basics'],['https://dor.georgia.gov/property-tax-real-and-personal-property-faq','Georgia: real property questions'],[links.exemption,'Georgia: homestead exemptions'],['https://www.fultoncountyga.gov/inside-fulton-county/about-fulton-county/governance','Fulton: county governance'],['https://www.fultoncountyga.gov/-/media/Departments/Customer-Service/2026AZ-Service-Guidefor-website51226.pdf','Fulton: 2026 service directory'],['https://www.fultoncountyga.gov/News/2025/08/06/Fulton-Holds-Millage-Rate-at-8-87-mills-for-2025','Fulton: adopted 2025 rate'],['https://news.fultonschools.org/details/~board/board-bulletin/post/board-bulletin-for-8202025','Fulton Schools: adopted 2025 rate'],[links.city,'Roswell: rates, exemptions, and billing'],[links.assessment,'Fulton: 2026 assessment announcement'],[links.appeal,'Fulton: appealing an assessment'],[links.bills,'Fulton: 2026 temporary billing announcement'],[links.adoption,'Roswell: adopted 2026 rate and billing schedule'],[links.proposal,'Roswell: earlier 2026 proposals'],['https://www.buckheadcid.com/about-us/faq/','Buckhead CID: eligible property'],['https://www.fultoncountyga.gov/inside-fulton-county/fulton-county-departments/tax-commissioner/property-taxes','Fulton: property-tax administration']].map(([href,label])=><Source key={href} href={href}>{label}</Source>)}</div></AccordionContent></AccordionItem></Accordion><div className="footer-bottom"><span>Made for the people who call Roswell home.</span><a href="#">Back to the top ↑</a></div></footer>
</main><TabBar current={current}/></>}
