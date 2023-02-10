import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FAQItem from './FAQItem';
import { Wrapper } from './styles';

export interface IFAQ {
  isBackToSupport: boolean;
  handleBackToSupport: (boolean) => void;
}

function FAQ(props:IFAQ) {
  const { handleBackToSupport, isBackToSupport } = props;
  const mockData =
  [{
    id: 1,
    title: 'Who is a "corporate" client?',
    content: 'A corporate client (often classed as an artificial entity in law), is a company that is incorporated and owned by at least one natural person and directed, controlled or managed by at least one natural person and who approach your firm for services.'
  }, {
    id: 2,
    title: 'Who is an "individual" client?',
    content: 'An individual client (often classed as a natural person in law), is any adult male or female (or) minor accompanied by an adult who comes to your firm for services.'
  }, {
    id: 3,
    title: 'What are Key Risk Indicators (KRI\'s) in Financial Crime risk compliance?',
    content: 'The term KRI\'s (Key Risk Indicators) is a measure used in financial crime compliance to indicate how risky a potential client and its activities could become if considered as a client of your firm. Through a series and combination of factors, KRI\'s act as an early warning signal of increasing risk exposures that may be present when you are about to onboard a prospect or existing client. The Kaizen RA Tool uses specific financial crime prevention KRI\'s to measure the likelihood that  the combined probability of events and its consequences could potentially exceed your firm’s risk appetite. Examples of these KRI’s include client type, country of trade or incorporation, sanctions, PEP, Adverse Media exposure, Source of Funds etc.'
  }, {
    id: 4,
    title: 'What is a risk assessment?',
    content: 'A risk assessment is a systematic method of involving a combined process of identifying, analysing and evaluating potential scenarios, instances or events associated with prospect or existing clients of yours with a view to an early detection of potential negative impact such clients (i.e. individuals or corporates) may pose to your firm. The resultant effect of the risk assessment allows you to make a judgement call on the tolerability of the risk through the outcome of a risk analysis report.'
  }, {
    id: 5,
    title: 'What types of corporate entities are there?',
    content: 'There are several types of corporate entities and these differ depending on the country in which they are formed in, the purpose and type of business activities the corporation intends to engage in, tax arrangements, number of shareholders and directors involved etc. General types range from your "simple entities" like limited liability companies (Ltd\'s), public limited companies (Plc\'s), Foundations etc to your more complex entity types such as Limited Partnership\'s LP\'s, SPAC\'s (Special Purpose Acquisition Companies), Fund structure vehicles etc.'
  }, {
    id: 6,
    title: 'What do we mean by a client is "listed"?',
    content: 'This term is only applicable to your corporate clients. Being "listed" signifies that your clients company is listed on a stock exchange that is recognised. Such stock exchanges are those that are in regions referred to as "comparable or equivalent jurisdictions". These are countries that several regulations and best practice guides consider as having a robust, firm and adequate preventative measures to managing money laundering and other financial crime risks. The drop down menu on the Kaizen\'s Risk Assessment tool gives you a guide on what these listings are.'
  }, {
    id: 7,
    title: 'What do we mean by a client is "regulated"?',
    content: 'This term is only applicable to your corporate clients. Being "regulated" signifies that your prospect or existing client is either regulated/monitored by a reliable and recognised financial regulator within countries deemed as "comparable or equivalent". Examples are the FCA in the United Kingdom, SEC in the United States of America, BAFIN in Germany etc. Regulated status can also come from "non financial based clients, such as schools, energy, or telecoms organisations who are prospect or existing clients of yours. The regulators of these industries in the United Kingdom are "OFSTEAD, OFGEN and OFCOM". Being regulated by such organisations gives a clout of monitoring, censorship or due diligence performed by such regulators on your clients hence therefore a reduced level of risk to you as a firm.'
  }, {
    id: 8,
    title: 'How are business activities risk ranked and why is it important?',
    content: 'Business activities are risk ranked based on the level, degree or propensity of risk that their activities or industries pose. For example, the likelihood that a client who engages in sale of military weapons or international procurement businesses has more tendency for potential money laundering or bribery and corruption risk due to the volume of trade, high value goods and countries or regions prone to corruption, as opposed to a client whose business activity or profession is a university lecturer or beverage industry etc.'
  }, {
    id: 9,
    title: 'What are country risk rankings and why are they important?',
    content: 'Country risk rankings refers to an index measure of risk exposures attributed to every country in the world based on some preconceived metrics based on financial crime risk factors such as "money laundering, bribery and corruption, tax haven jurisdictions etc. The most common country risk rankings are the Transparency International (CPI index) or the Basel Money Laundering Risk Index. Kaizen\'s RA Tool uses a unique hybrid model to capture various forms of key risk triggers and come up with a fair assessment of country risk ratings updated annually.'
  }, {
    id: 10,
    title: 'What are sanctions/embargoes?',
    content: 'Sanctions and embargoes are political trade restrictions put in place against target countries with the aim of maintaining or restoring international peace. Sanctions can impact and target individuals, countries, governments, groups, organisations and vessels. Sanctions can be economic, political, or legal in nature and may involve prohibited, comprehensive or targeted sanctions which general mean we cannot do business with certain countries or individuals or trade due to certain embargoes and restrictions or certain individuals who may have travel bans imposed against them.'
  }, {
    id: 11,
    title: 'What do we mean by "products & services"?',
    content: 'Within the Kaizen Risk Assessment Tool, the reference to "products and services" are specific to what you as a firm (i.e. law firm or Accountancy firm) provide to the prospect or existing client. They have been risk assessed and risk scored as products or services that are deemed of low, medium or high risk. These assessments are based on the propensity for abuse, misuse or links to potential money laundering, sanctions violation, tax evasion, aggressive tax avoidance measures. For Example, a client wanting tax advice, immigration or defence/military poses a greater risk than a client wanting ..........................................'
  }, {
    id: 12,
    title: 'What are we looking for when asked about a corporate clients "existence"?',
    content: 'This trigger is essential when we get to asses the age of a corporate entity. This is calculated from the date of incorporation to the moment you are about to conduct a risk assessment and subsequent due diligence. The rational is that a newly incorporated entity or one that is less than 2 years old has little or no record of financial transaction, trading history, assessment of expected account activity, experience in the trade/business activity etc to be able to make a judgement call on risk factors such as financial stability, propensity to conduct illicit activities, sufficient evidence to assess the company\'s general performance over time etc. A newly incorporated company will most likely file its first accounts in 18 months of establishment and that is not sufficient time and data to make a rationale judgement hence why such clients are ranked "high risk" on this specific KRI. However, a company with several years i.e. 5, 10, 15 years experience has sufficient data for you to analyse and make a risk related judgement call.'
  }, {
    id: 13,
    title: 'Who is a PEP?',
    content: 'The term PEP refers to "politically exposed persons" and these are individuals who hold or have held a senior prominent public position within executive, legislative pr judiciary roles in government. It also includes close family members, close business associates of the PEP\'s and also executives of state owned entities. PEP\'s are often classified as high risk when assessing risk ratings because of their potential and propensity to abusing their position in office and likelihood of being involved in bribery and corruption.'
  }, {
    id: 14,
    title: 'What are the risk exposures associated with a PEP?',
    content: 'Having a PEP (Politically Exposed Person) as an individual client or one that is a director or shareholder in your corporate client does not mean you cannot deal or engage with them. It simply means from a financial rime prevention standpoint, there is a propensity for increased risk and you need to perform enhanced due diligence and take special care in managing the PEP risk exposure. Such risk exposures can be (i) potential for abuse of power by the PEP\'s position (ii) potential for bribery & corruption (iii) potential to use information that would ordinarily not be within the public domain for the PEP\'s person gain (iv) potential that a bad PEP\'s negative adverse media may taint your firms reputation due to your association with them etc'
  }, {
    id: 15,
    title: 'How can I check whether my client is a PEP or linked to a PEP?',
    content: 'The use of certain tools such as World Check, Down Jones (Factiva), Accuity, World Compliance etc are designed specifically to determine PEP risk exposure. The Kaizen RA Tool will have API\'s connected to such 3rd Party risk tools in order to enable searches. Alternatively, those with low budget have to perform google string searches and determine whether or not the named individual is a PEP based on the definition of a PEP. See the FAQ\'s for full PEP definition.'
  }, {
    id: 16,
    title: 'What does the availability of KYC information from my client tell about risk exposure?',
    content: 'Prospect or existing clients who are willing and able to provide KYC information on demand by your firm are considered more favourable and less riskier than those who query, fail to produce or give irrational explanations as to why they cannot provide legally required information on demand. This is a subjective judgement call but a clear "barometer" in determining the next phase of performing due diligence as the documents asked for will help identify, verify and corroborate information being asked in assessing the clients overall risk assessment.'
  }, {
    id: 17,
    title: 'What is adverse media (or) negative news?',
    content: 'These are reliable and relevant information and news within the public domain that raise concerns on the character, reputation and suitability of a prospect client due to concerns around financial crime concerns such as money launder, sanctions violation, bribery and corruption, fraud, market abuse etc. It can also include non financial related concerns such as human and animal rights abuses, sustainability abuse etc.'
  }, {
    id: 18,
    title: 'How can adverse media or negative news affect my clients risk rating outcome?',
    content: 'The association or link to a prospect or existing client that has adverse media on financial crime and certain non financial crime related concerns can create reputational risk concerns on your firm. This will be reflected in the risk assessment measures being taken and where such negative or adverse media news border on things like prohibited sanctions, money laundering etc it would be recommended that the risk of doing business with such client be reviewed by the nominated person/MLRO before engaging with them.'
  }, {
    id: 19,
    title: 'How can I check the sanctions risk exposure levels of my client?',
    content: 'This can be done either through inbuilt API\'s (Application Programming Interface) in the Kaizen Risk Assessment tool, or links to sanctions listings within OFAC, HM Treasury, UN resolutions or EU Sanctions listings. Check Kaizen Compliance Solutions for potential training and guidance on this subject.'
  }, {
    id: 20,
    title: 'What are "Special Category of Clients" (SCC)?',
    content: 'This is a discretionary KRI in the Kaizen RA Tool. However it is strongly recommended to have a special category list linked with your firm\'s policy which calls out those business activities or types of clients that you want to keep a special eye on due to their propensity to higher risk concerns which need your constant attention. Examples could be ....................................................'
  }, {
    id: 21,
    title: 'Is it important for my firm to have this (SCC) listing?',
    content: 'Yes it is because it shows that your risk assessment is placing special priority in capturing those client types or business activities that have a likelihood or propensity to higher financial crime risk concerns.'
  }, {
    id: 22,
    title: 'What is a "Prohibited Client" (PC) list?',
    content: 'This is a discretionary KRI in the Kaizen RA Tool. However it is strongly recommended to have a Prohibited Client listing tied in with your firms policy because it states a clear guideline on who you intend NOT to do business with wither due to legal, regulatory or ethical standing and these can be weeded out and taken care of before ever engaging with such clientele. Examples could be client based in or trading with or from prohibited sanctioned countries like North Korea, Syria, Sudan, etc.'
  }, {
    id: 23,
    title: 'Is it important for my firm to have this (PC) listing?',
    content: 'Yes it is because it shows that your risk assessment is placing special priority in capturing those client types or business activities that your firm strictly intend not to deal with due to legal or regulatory restrictions or from the firms policy, moral or ethical standpoint.'
  }, {
    id: 24,
    title: 'What are "suffixes" and why are they important in performing due diligence?',
    content: 'The term "suffixes" is a letter or group of letters that goes at the end of every company type. For example "Ltd", "Plc", AG, SA, "OOO". They assist with three (3) things in the performance of due diligence (i) it tells us what type of company format it is (ii) it tells us which country it is likely incorporated in (and) (iii) it is a good indicator of risk exposures levels to watch out for. For example an "OOO or OAO" suffix tells me it is a Russian registered private or public company. This assists with country risk ratings and potential sanctions risk exposures. Note that this is specific to "corporate clients ONLY". Individual clients will have the Mr, Ms, Mrs, Dr, Prof, Amb suffices which dente title and status which invariably could assist with making a judgement call on the individuals experience/profession (i.e. professorship or doctorate titles), tax implications (i.e. Mrs and marital status) etc.'
  }, {
    id: 25,
    title: 'Why is the profession of a "natural person/individual" important in risk assessment?',
    content: 'The profession of a prospect individual (natural person) client helps your risk assessment and eventual due diligence because it tells you what the expected income levels of the individuals are. It tells you which industry they work in and this gauges risk exposure levels on sectors. A combination of profession, country of residency, nationality or trade and the services required, gives you a better picture of your prospect clients risk exposure levels. For example.......................................'
  }, {
    id: 26,
    title: 'Why is knowing the number of years an individual has in his/her professional career important in risk assessment?',
    content: 'This is important because it serves as a metric for determining "level of experience, longevity, reliability and consistency measures. These triggers help assess other KRI\'s such as source of income, source of wealth, business activity or industry types etc. The longer a person (individual) stays in a role, employment or even industry type, the more "reassuring and certain" you as a firm are of their experience and commitment levels and these elements invariable guide against the type f services you may offer and costings.'
  }, {
    id: 27,
    title: 'Why is knowing sanctions exposure important in assessing risk exposure in both corporate and individuals?',
    content: 'Having an understanding of sanctions risk exposure levels of a prospect client helps you assess which clients may be "prohibited" from you doing business with them and those clients that potential have "restrictions" such as "travel bans, trade embargoes" etc. This will affect the potential products, goods or services they deal with and the prospect service they are about to seek from your firm.'
  }, {
    id: 28,
    title: 'Why is knowing the country of incorporation important in assessing risk exposure?',
    content: 'Subject to impact and implication from the "UK Equality Act" and similar laws, country of incorporation of a company helps assess the likelihood of exposure of sanctions, rogue or hostile nations, tax haven jurisdictions, high risk 3rd countries which all affect whether or not you can deal with such companies or provide services to them.'
  }, {
    id: 29,
    title: 'Why is knowing the country of residency important in assessing risk exposure?',
    content: 'The country of residency often assists with assessing tax implication issues. Both natural persons and corporates have countries of birth and incorporation and the assumption is they pay taxes in such regions. Identifying residency helps assess where tax is due in order to assist your firm in avoiding potential "facilitation of tax evasion" etc'
  }, {
    id: 30,
    title: 'What is Source of Income (SoI)?',
    content: 'The term "source of income" refers to the general assessment of identifiable funds that an individual gets or makes. This could be salaries, regular donations, rental income etc over a period of time (often assessed yearly). Often the best form of measuring or assessing this is an individuals "self assessment filings" with tax authorities like HMRC. In a scenario involving a corporate client, this will be turnovers on an annual basis and this can be ascertained through filed annual returns, or published annual reports/accounts etc.'
  }, {
    id: 31,
    title: 'What is Source of Wealth (SoW)?',
    content: 'The term "source of wealth" refers to the cumulative understanding and evidence surrounding an assessment of how much an individual or company is worth at a given point in time. For an individual it could include annual wages, inheritance, properties, stock, bonds, shares etc which make up the individuals net worth. In the case of a company, it will generally comprise of assessment of the turnover, assets both tangible and intangible i.e. buildings, brand name, intellectual property etc.'
  }, {
    id: 32,
    title: 'Why is Source of Income (SoI) important in assessing risk exposure?',
    content: 'It is important because it serves as a "barometer" of assessing if a client\'s actual or projected income ties in with what they do as a business or profession. Where the income projected does not match the known occupation or business activity of the client then this will arouse knowledge or suspicion of potential money laundering or the individual being used as a "mule for laundering" or the company acting as a "front" for an illicit activity and the laundering of funds through this company.'
  }, {
    id: 33,
    title: 'Why is Source of Wealth (SoW) important in assessing risk exposure?',
    content: 'It is important because it serves as a "barometer" of assessing if a client\'s stated source of wealth makes sense with the client\'s business activity or profession. Factors that will help determine this are time period of existence, account details, physical evidence, reliable information within the public domain and plain common sense. If it is plausible through assertions and evidence that the net worth of an individual or company is as claimed there may not be a need for concern. Where things don\'t add up then concerns should be raised/escalated to your nominated person, MLRO or line manager.'
  }, {
    id: 34,
    title: 'What is "simplified due diligence"?',
    content: '..awaiting Neil\'s definitions in RA Tool'
  }, {
    id: 35,
    title: 'What is "standard due diligence"?',
    content: '..awaiting Neil\'s definitions in RA Tool'
  }, {
    id: 36,
    title: 'What is "enhanced due diligence"?',
    content: '..awaiting Neil\'s definitions in RA Tool'
  }, {
    id: 37,
    title: 'When are you required to review and refresh your due diligence?',
    content: 'Subject to your company\'s policy, they are to be reviewed either on a 1,2,3 (or) 1,3,5 year cycle or when you are made aware of a event driven circumstances or change that is fundamental enough to initiate a review of the risk rating of the client. This event or circumstances is referred to as an EDR. See FAQ\'s on this for further guidance.'
  }, {
    id: 38,
    title: 'What is ID&V (Identification and verification)',
    content: 'The term ID&V is often misconstrued and it relates to "identification and verification" of individuals (where you are dealing with natural persons (or) identification and verification of a company, its directors and shareholders when you are engaging with a company. Identification entails stating the full names and dates of birth of an individual (natural person) or individual (directors or shareholders) and full name of a company and its date of incorporation when dealing with a company. Verification on the other hand is ascertaining that the "identification" details are correct and they can be corroborated through acceptable documents like passports, utility bills, bank statements, incorporation documents etc.'
  }, {
    id: 39,
    title: 'How often should you onboard a client?',
    content: 'A client should be onboard once during the period of initial engagement. However the client file; subject to your policies, should be reviewed within the 1, 2 or 3 (or) 1, 3 or 5 year cycle. See PR\'s for further guidance.'
  }, {
    id: 40,
    title: 'What is Periodic Review (PR)?',
    content: 'Subject to your company\'s policies, Periodic Reviews (PR\'s) are the time periods that your firm should refresh the due diligence of your client files. These could be on a cycle of 1, 2 or 3 years or 1, 3 and 5 years covering client files that are classed as "high, medium or low" risk respectively. During these time lines, you will be expected to review KRI\'s and see if there are any fundamental changes to existing records which may change your perception of client risk exposure.'
  }, {
    id: 41,
    title: 'What is an Event Driven Review (EDR)?',
    content: 'Subject to your company\'s policies the term EDR\'s stands for Event Driven Reviews and these are simply change related incidences in your clients circumstances that pose a likely of risk exposure or potential change in your assessment of risk. For example, change in name, change in business activity, change in country of trade/registration/ changes to directors, shareholders, or a hit on sanctions, PEP risk exposure or negative adverse media hits.'
  }, {
    id: 42,
    title: 'What should you do if a clients overall risk rating comes out as "unacceptable"?',
    content: 'Subject to your company\'s policy, you should seize onboarding the prospect client or continue business engagements with them. Escalate the matter/client file to your MLRO, Nominated Person or Line Manager in order to determine the grounds why the client is flagged as "unacceptable". It could be that the prospect client is a "prohibited client" in violation of sanctions, known black lists, substantial negative adverse media news; all of which can subject your company to reputational risk concerns if you continue to engage with them.'
  }, {
    id: 43,
    title: 'What should you do if a clients overall risk rating comes out as "low risk"?',
    content: 'Follow guidance provided by Neil for the Kaizen Risk Assessment Tool. In summary this will require the following: ….......................'
  }, {
    id: 44,
    title: 'What should you do if a clients overall risk rating comes out as "medium risk"?',
    content: 'Follow guidance provided by Neil for the Kaizen Risk Assessment Tool. In summary this will require the following: ….......................'
  }, {
    id: 45,
    title: 'What should you do if a clients overall risk rating comes out as "high risk"?',
    content: 'Follow guidance provided by Neil for the Kaizen Risk Assessment Tool. In summary this will require the following: ….......................'
  }, {
    id: 46,
    title: 'Who are directors of a company?',
    content: 'A director is an elected individual who, along with other directors, is responsible for a company\'s (your client\'s) day to day activities. Directors can take many forms depending of the region/country the company is registered and the size of the company. Examples of directors are those who are members of the Executive and (or) Supervisory Boards (including CEO\'s, CFO\'s, CRO\'s, COO\'s, Chairman, President etc), Managing Directors, Nominee Directors, General Managers, Designated Individuals, Partners, Investment Managers etc.'
  }, {
    id: 47,
    title: 'Why are details of the directors required when performing due diligence?',
    content: 'They are needed for the purposes of initially identifying the individual(s) behind ownership and control of your corporate client in order to assess risk exposures resulting from things like the individual directors level of exposure to sanctions risk, money laundering risk, terrorist financing risk, country and residency identification linked to tax/rogue countries/3rd high risk countries and any financial crime or non financial crime related negative adverse media hits on the named individual. '
  }, {
    id: 48,
    title: 'Who are shareholders of a company?',
    content: 'A shareholder is any person, company, or institution that owns shares in a company\'s stock. A company shareholder can hold as little as one share. You can identify shareholders from the incorporation documents/shareholder certificates filed at the companies registry in the country where your company/client is registered/incorporated.'
  }, {
    id: 49,
    title: 'Why are details of the shareholders required when performing due diligence?',
    content: 'They are needed for the purposes of initially identifying the individual(s) behind ownership and control of your corporate client in order to assess risk exposures resulting from things like the individual shareholders level of exposure to sanctions risk, money laundering risk, terrorist financing risk, country and residency identification linked to tax/rogue countries/3rd high risk countries and any financial crime or non financial crime related negative adverse media hits on the named individual.'
  }, {
    id: 50,
    title: 'What can you do if you do not have details of the shareholders of a corporate client?',
    content: 'The MLR 2017 require you to identify shareholders holding 25% or more shares in a company and verify their identity in certain instances where the client is risk assessed as being high risk or EDD is required. Where you have exhausted all possible avenues of securing the ID&V of a shareholder, the law allows you to identify the SMO (Senior Management Official) instead of the shareholders holding 25%. In this instance, these are the CEO\'s, CFO\'s, COO\'s, or key directors of a company..'
  }]
  return (
       <Wrapper>
        <Box className='wrapper_back_support'>
          <ArrowBackIcon onClick={() => handleBackToSupport(!isBackToSupport)}/>
          <Typography className="wrapper_title">
            SUPPORT
          </Typography>
        </Box>
        <Typography className="wrapper_subtitle">FAQ</Typography>
          {mockData.map((item) => (
            <FAQItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
            />
        ))}
      </Wrapper>
  );
}

export default React.memo(FAQ);
