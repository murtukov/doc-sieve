export default
`# Good Practices for Research Software
## 8.1 Focus and Description
It is important to put forward some key practices for the development and (re)use of research software, as doing so facilitates sharing and accelerates the production of results in response to the COVID-19 pandemic.


We provide here a number of foundational, clear and practical recommendations around research software principles and practices, in order to facilitate the open collaborations that can contribute to addressing the current challenging circumstances. These recommendations aim to enable relatively small points of improvement across all aspects of software that will allow its swift (re)use, enabling the accelerated and reproducible research needed during this crisis. These recommendations highlight key points derived from a wide range of work on how to improve the management of software to achieve better research (Akhmerov et al., 2019; Anzt et al., 2020; Clément-Fontaine et al., 2019; Jiménez et al., 2017; Lamprecht et al., 2019; Wilson et al., 2017).

## 8.2 Scope
These recommendations cover general practices, not details of particular technologies or software development tools. The recommendations in Section 8.5 (Guidelines for researchers) will not only help researchers improve their software quality and research reproducibility but also have an impact on policy makers, funders and publishers. The aim is that researchers follow the principles as thoroughly as possible, because doing so will improve the research environment for themselves and others. With the recommendations in Section 8.3 (Policy recommendations), we aim for policy makers and funders to realise the--sometimes behind the scenes--work around research software (e.g., documentation and maintenance).  Such awareness will help them to create opportunities addressing, for instance, the acquisition of skills and the full development cycle. With the recommendations in Section 8.4 (Guidelines for publishers), we aim for publishers to push forward citable software so it becomes equal in recognition to data and scholarly publications as a research outcome.


Throughout this document we will be using software as a placeholder and interchangeably for compiled software (i.e., binaries) as well as for software source code (including, for example, analysis scripts and macros ). When necessary to differentiate, we will make an explicit comment.

## 8.3 Policy recommendations
Research software is essential for research, and this is increasingly recognised globally by researchers. This section provides recommendations for policy makers and funders on how to support the research software community to respond to COVID-19 challenges, based on existing work (Akhmerov et al., 2019; Anzt et al., 2020). National and international policy changes are now needed to increase this recognition and to increase the impact of the software in important research and policy areas. Additionally, given the impact that funding agencies can have in shaping research, it is equally important to ensure that research software is recognised and acknowledged as a direct and measurable outcome of funded efforts.

### 8.3.1 Support the funding of development and maintenance of critical research software
Policy makers and funders must continue to allocate financial resources to programs that support the development of new research software and the maintenance of research software that has a large user base and/or an important role in a research area. By providing the resources that are necessary to adhere to best software development practices, policy makers and funders can increase overall software quality and usefulness.  This can be done by making it easier for researchers to move from quick and makeshift coding to creating shared and reusable software, allowing implementation of recommendations detailed in Sections 8.5.4 (provide sufficient metadata/documentation) and 8.5.5 (ensure portability and reproducibility). Funding for software development will also enable anyone producing research software to take the time to produce and document it well, which also aligns with recommendation on Section 8.5.4. After the software has been delivered, used and recognized by a sufficiently large group of users, human and financial resources should be allocated to support the regular maintenance of the software, for activities such as debugging, continuous improvement, documentation and training.


Examples: UK Research and Innovation is funding COVID-19 related projects that can include work focussed on evaluation of clinical information and trials, spatial mapping and contact mapping tools (UK Research and Innovation, 2020). Mozilla has created a COVID-19 Solutions Fund for open source technology projects (Mozilla, 2020). USA’s National Institutes of Health (NIH) provides  "Administrative Supplements to Support Enhancement of Software Tools for Open Science" (NIH, 2020b). The Chan Zuckerberg Initiative is funding open source software projects that are essential to biomedical research (Chan Zuckerberg Initiative, 2020).

### 8.3.2 Encourage research software to be open source and require it to be available
Policy makers should enact policies that encourage software to be available under an open source software licence, or at least require the software to be accessible. All research software that is released under a licence ensures clarity of how it can be used and protects the copyright holders. The use of open source software licences should be seen as the default for research software in publicly funded efforts. If that is the case, it means that its underlying source code is made freely accessible, as encouraged by the “A” in FAIR (Findable, Accessible, Interoperable and Reusable) (Wilkinson et al., 2016) to users to examine;[a] it can be modified and redistributed (depending on the licence conditions). Through this process, software users can review, understand, improve, and build upon the software. As research outcomes rely on software, if software is not open source it must minimally be available for testing with different inputs, to enable understanding of the software’s functionality and properties and to reproduce the research outcomes. Whilst preprints and papers are increasingly openly shared to accelerate COVID-19 responses, the software and/or source code for these papers is often not cited (Howison and Bullard, 2016) and hard to find, making reproducibility of this research challenging, if not impossible (Smith et al., 2016). Encouraging publishers to make software availability a default condition, together with the usually existing requirement for data availability, is an excellent way to greatly improve this.


The policies and incentives recommended here will motivate researchers to implement recommendations in Sections 8.5.1 (make your software available), 8.5.2 (release your software under a licence) and 8.5.6 (publish snapshots of your software in an archival repository with persistent identifiers (PIDs)) from the good practices section, thus increasing findability, continued usefulness, and improvement of software.


Examples: The research community has been increasing access to key software and code, with a recent Science article calling for all scientists modeling COVID-19 and its consequences for health and society to rapidly and openly publish their code (Barton et al., 2020). High-profile examples include the Imperial College epidemic simulation model that is being utilised by government decision-makers, which was made publicly available with support by Microsoft to accelerate the process (Adam, 2020). The fact that it was open  also meant it could be inspected and improved. This is an important point that emphasises the raising of quality and the foundation of trust in results.

### 8.3.3 Encourage the research community’s ability to apply best practices for research software, including training in software development concepts
Policy makers and funders should provide programs and funding opportunities that encourage both researchers and research support professionals (such as Research Software Engineers and Data Stewards) to utilise best practices to develop better software faster. In order to make research software understandable and reusable, it must be produced and maintained using standard practices that follow standard concepts, which can be applied to software ranging from researchers writing small scripts and models, to teams developing large, widely-used platforms. As research is becoming data-driven and collaborative in all areas, all researchers and key research support professionals would benefit from the development of core software expertise. Policy makers should support inclusive software skills and training programs, including development of communities of learners and trainers.


The introduction of such programs and funding opportunities will increase the overall understanding and adaptation of all recommendations from the good practices section among researchers. This supports the outcomes of the other three recommendations in this section.  This also makes it easier for researchers to align to all the recommendations provided in Section 8.5 targeting good practices for research software.


Examples: There are various initiatives that link community members with specific digital skills to projects needing additional support, including Open Source Software helpdesk for COVID-19 (Caswell et al., 2020) and COVID-19 Cognitive City (Grape, 2020). Other initiatives aim to increase skills for engaging with software and code, such as the Carpentries (Carpentries, 2020), USA’s NIH events (NIH, 2020a); and the Galaxy Community and ELIXIR’s webinar series (ELIXIR, 2020).

### 8.3.4 Support recognition of the role of software in achieving research outcomes
Policy makers should enact policies and programs that recognise the important role of research software in achieving research outcomes. It is important that policy makers encourage the development of research assessment systems that reward software outputs, alongside publications, data and other research objects. It is equally critical that funders ensure that data and software management plans are a requirement in funding processes. It is also important that policy makers work to ensure these systems include proactive responses when these are not implemented. Enacting such policies will encourage researchers to implement recommendations in Sections 8.5.1 (make your software available), 8.5.3 (cite the software you use) and 8.5.6 (publish snapshots of your software in an archival repository with persistent identifiers (PIDs)) from the good practices section, thus creating a self-strengthening system of incentives for the development of high-quality software.


Examples: Policy makers need to support initiatives such as the Declaration on Research Assessment (DORA, 2016), which are beginning to be utilised by research agencies including the Wellcome Trust (Wellcome Trust, 2020), signatories to the Concordat to Support the Career Development of Researchers (Vitae, 2020).
8.4 Guidelines for publishers
A key component of better research is better software. Publishers can play an important role in changing research culture, and have the ability to make policy changes to facilitate increased recognition of the importance of software in research. This section provides recommendations for publishers on how to support the research software community to respond to COVID-19 challenges.


### 8.4.1 Require that software citations be included in publications
It is essential that the role of software in achieving research outcomes is supported. Treating research software as a first class research object in a scholarly publication is a very effective mechanism for implementing this, as it increases the visibility and credit to the research software developers (for example by enabling academic and commercial citation services and/or databases, such as Google Scholar, Scopus and Microsoft Academic) (Smith et al., 2016).


Examples: The FORCE11 Software Citation Implementation Working Group (Chue Hong et al., 2017) has been leading work in this area for 3+ years, and currently has a journals task force that is developing sample language for journals to use. The AAS Journals encourage software citation in several ways (explicit software policy, added the LaTeX \\software{} tag to emphasise code used, etc.) (AAS Journals, 2020).


### 8.4.2 Require that software developed for a publication is deposited  in a repository that supports Persistent Identifiers (PIDs)
For publishers to ensure that the research that they publish is reproducible, software developed as part of the work reported in a submission must also be findable. Publishers should require such software to be deposited in an archival repository that supports PIDs such as Zenodo (CERN, 2020) and figshare (FigShare, 2020). These repositories provide PIDs that can be directly included in the citation and referenced in a publication, supporting research integrity (Di Cosmo et al., 2018). If the software is deposited along with data (DataCite, 2020) as recommended in certain communities of practice,  the selected data repository should provide a PID for the collection. Several versions of the software can be tagged with PIDs and, thus, if multiple versions are used for research, having different PIDs ensures reproducibility.


Example: The Journal of Open Source Software (JOSS, 2020) review process requires authors to make a tagged release of the software after acceptance, and deposit a copy of the repository with a data-archiving service such as Zenodo or figshare. This is part of the guidance from the FORCE11[b][c][d][e] Software Citation Implementation Working Group (Chue Hong et al., 2017). The GigaScience journal is another example of publication requiring the availability of software (GigaScience, 2020).


### 8.4.3 Align submission requirements of software publishers to research software best practices
Recently research software has gained a more prominent place in publishing and some journals specialise in publishing software and software papers. In order to make research software understandable and reusable, it must be produced and maintained using standard practices that follow standard concepts. This can be applied to software ranging from researchers writing small scripts and models; to teams developing large, widely-used platforms. As publishing is an integral part of research, software publishers should enact policies and adopt submission procedures, including appropriate software review processes, that encourage and support these practices, for example through adopting or adapting software management statements similarly to the widely adopted data management statements.


Example: The Journal of Open Source Software (JOSS) requires software to be open source and be stored in a repository that can be cloned without registration, is browsable online without registration, has an issue tracker that is readable without registration and permits individuals to create issues/file tickets (JOSS, 2020); SoftwareX submission process includes two mandatory metadata tables that include licence and code availability (Elsevier, 2020).

## 8.5 Guidelines for researchers
These guidelines aim at supporting researchers with key practices that foster the development and (re)use of research software, as these facilitate code sharing and accelerated results in response to the COVID-19 pandemic. This section will be relevant to audiences ranging from researchers and research software engineers with comparatively high levels of knowledge about software development to experimentalists, such as wet-lab and other researchers in a range of disciplines, writing scripts or macros with almost no background in software development.

### 8.5.1 Make your software available
Making software that has been developed available is essential for understanding your work, allowing others to check if there are errors in the software, be able to reproduce your work, and ultimately, build upon your work. The key point here is to ensure that the source code itself is shared and freely available (see information about licences below), through a platform that supports access to it and allows you to effectively track development with versioning (e.g., code repositories such as GitHub (GitHub Inc., 2020b), Bitbucket (Atlassian, 2020), GitLab (GitLab, 2020), etc.). Furthermore, if using third-party software (proprietary or otherwise), researchers should share and make available the software source code (e.g., analysis scripts) they produce (even if they do not have the intellectual property rights to share the software platform or application itself).


Resources:
Four Simple Recommendations to Encourage Best Practices in Research Software (Jiménez et al., 2017).
FAIR Software guidelines on code repositories (eScience Center, 2020).


### 8.5.2 Release your software under a licence
Software is typically protected by Copyright in most countries, with copyright often held by the institution that does the work rather than the developer themself. By providing a licence for your software, you grant others certain freedoms, i.e., you define what they are allowed to do with your code. Free and Open Software licences typically allow the user to use, study, improve and share your code. You can licence all the software you write, including scripts and macros you develop on proprietary platforms.


Resource: Choose an Open Source License (GitHub Inc., 2020a).


### 8.5.3 Cite the software you use
It is good practice to acknowledge and cite the software you use in the same fashion as you cite papers to both identify the software and to give credit to its developers. For software developed in an academic setting, this is the most effective way of supporting its continued development and maintenance because it matches the current incentives of that system.


Resource: Software Citation Principles (Smith et al., 2016).


### 8.5.4 Provide metadata/documentation for others to use your software
(Re)using code/software requires knowledge of two main aspects at minimum: environment and expected input/output. The goal is to provide sufficient information that computational results can be reproduced and may require a minimum working example.


Resource: Ten simple rules for documenting scientific software (Lee, 2018).


### 8.5.5 Ensure portability and reproducibility of results
It is critical, especially in a crisis, for software that is used in data analysis to produce results that can, if necessary, be reproduced. This requires automatic logging of all parameter values (including setting random seeds to predetermined values), as well as establishing the requirements in the environment (dependencies, etc). Container systems such as Docker or Singularity can replicate the exact environment for others to run software/code in.


Resource:
Ten Simple Rules for Writing Dockerfiles for Reproducible Data Science (Nüst et al., 2020).
Ten Simple Rules for Reproducible Computational Research (Sandve et al., 2013).


### 8.5.6 Publish snapshots of software in an archival repository with persistent identifiers (PIDs)
Equally important to making the source code available is providing a means of preserving and referring to it in the long-term (Cosmo et al., 2018). For this reason, software should be deposited within a repository that supports persistent identifiers (PIDs - a specific example being DOIs), allows for robust metadata and discovery mechanisms, and provides more persistent storage than the code development and collaboration platforms mentioned in Section 8.5.1. Such repositories include Zenodo (CERN, 2020) and figshare (FigShare, 2020). There are communities of practice that encourage deposition of software (e.g., analysis scripts) and data in one submission. In those circumstances the selected data repository (DataCite, 2020) should provide a PID for the collection. For reproducibility purposes, and if legally allowed, dependencies should also be included in the software deposition.  When publishing research results, include a formal citation to the software including a reference to the PID.


Resources:
FAIR software guidelines on citing software (eScience Center, 2020).
List of software registries (Spaaks et al., 2019/2020).
Making your code citable through GitHub and Zenodo (GitHub, Inc., 2016).
References list[f][g]
AAS Journals. (2020). Software citation suggestions. AAS Journals. https://journals.aas.org/software-citation-suggestions/
Adam, D. (2020). Special report: The simulations driving the world’s response to COVID-19. Nature, 580(7803), 316–318. https://doi.org/10.1038/d41586-020-01003-6
Akhmerov, A., Cruz, M., Drost, N., Hof, C., Knapen, T., Kuzak, M., Martinez-Ortiz, C., Turkyilmaz-van der Velden, Y., & van Werkhoven, B. (2019). Raising the Profile of Research Software. Zenodo. https://doi.org/10.5281/zenodo.3378572
Anzt, H., Bach, F., Druskat, S., Löffler, F., Loewe, A., Renard, B. Y., Seemann, G., Struck, A., Achhammer, E., Aggarwal, P., Appel, F., Bader, M., Brusch, L., Busse, C., Chourdakis, G., Dabrowski, P. W., Ebert, P., Flemisch, B., Friedl, S., … Weeber, R. (2020). An environment for sustainable research software in Germany and beyond: Current state, open challenges, and call for action. F1000Research, 9, 295. https://doi.org/10.12688/f1000research.23224.1
Atlassian. (2020). Bitbucket. Bitbucket. https://bitbucket.org/product
Barton, C. M., Alberti, M., Ames, D., Atkinson, J.-A., Bales, J., Burke, E., Chen, M., Diallo, S. Y., Earn, D. J. D., Fath, B., Feng, Z., Gibbons, C., Hammond, R., Heffernan, J., Houser, H., Hovmand, P. S., Kopainsky, B., Mabry, P. L., Mair, C., … Tucker, G. (2020). Call for transparency of COVID-19 models. Science, 368(6490), 482.2-483. https://doi.org/10.1126/science.abb8637
Caswell, T., Corlay, S., François, R., Gommers, R., Gramfort, A., Grisel, O., Grout, J., Heagy, L., Howard, J., Mueller, A., Pérez, F., Thiéry, N. M., Varoquaux, N., Wickham, H., & Willing, C. (2020, April 30). COVID-19 Open Source Help Desk. https://covid-oss-help.org/
CERN. (2020). Zenodo. https://zenodo.org
Chan Zuckerberg Initiative. (2020, April 30). CZI Launches Funding Opportunity for Open Source Software. Chan Zuckerberg Initiative. https://chanzuckerberg.com/rfa/essential-open-source-software-for-science/
Clément-Fontaine, M., Di Cosmo, R., Guerry, B., Moreau, P., & Pellegrini, F. (2019). Encouraging a wider usage of software derived from research [Research Report]. Committee for Open Science’s Free Software and Open Source Project Group. https://hal.archives-ouvertes.fr/hal-02545142
Cosmo, R. D., Gruenpeter, M., & Zacchiroli, S. (2018). 204.4 Identifiers for Digital Objects: The case of software source code preservation. https://doi.org/10.17605/OSF.IO/KDE56
DORA. (2016). San Francisco Declaration on Research Assessment. https://sfdora.org/read/
ELIXIR. (2020, April 30). Galaxy-ELIXIR webinar series: FAIR data and Open Infrastructures to tackle the COVID-19 pandemic | ELIXIR. https://elixir-europe.org/events/webinar-galaxy-elixir-covid19
Elsevier. (2020). SoftwareX. https://www.journals.elsevier.com/softwarex
eScience Center. (2020). FAIR Research Software. FAIR Research Software. https://fair-software.nl/recommendations/repository
FigShare. (2020). FigShare. https://figshare.com/
GitHub, Inc. (2016). Making Your Code Citable. Making Your Code Citable; GitHub Guides. https://guides.github.com/activities/citable-code/
GitHub Inc. (2020a). Choose an open source license. Choose a License. https://choosealicense.com/
GitHub Inc. (2020b). GitHub. GitHub. https://github.com/
GitLab. (2020). GitLab. GitLab. https://about.gitlab.com/
Grape, D. (2020, April 30). Exaptive Partners with Bill & Melinda Gates Foundation, Launching The COVID-19 Cognitive City. https://www.exaptive.com/news/exaptive-partners-with-bill-melinda-gates-foundation-launching-the-covid-19-cognitive-city
Jiménez, R. C., Kuzak, M., Alhamdoosh, M., Barker, M., Batut, B., Borg, M., Capella-Gutierrez, S., Chue Hong, N., Cook, M., Corpas, M., Flannery, M., Garcia, L., Gelpí, J. Ll., Gladman, S., Goble, C., González Ferreiro, M., Gonzalez-Beltran, A., Griffin, P. C., Grüning, B., … Crouch, S. (2017). Four simple recommendations to encourage best practices in research software. F1000Research, 6, 876. https://doi.org/10.12688/f1000research.11407.1
JOSS. (2020). Journal of Open Source Software. https://joss.theoj.org
Lamprecht, A.-L., Garcia, L., Kuzak, M., Martinez, C., Arcila, R., Martin Del Pico, E., Dominguez Del Angel, V., van de Sandt, S., Ison, J., Martinez, P. A., McQuilton, P., Valencia, A., Harrow, J., Psomopoulos, F., Gelpi, J. L., Chue Hong, N., Goble, C., & Capella-Gutierrez, S. (2019). Towards FAIR principles for research software. Data Science, Preprint, 1–23. https://doi.org/10.3233/DS-190026
Lee, B. D. (2018). Ten simple rules for documenting scientific software. PLOS Computational Biology, 14(12), e1006561. https://doi.org/10.1371/journal.pcbi.1006561
Mozilla. (2020, April 30). MOSS launches COVID-19 Solutions Fund. The Mozilla Blog. https://blog.mozilla.org/blog/2020/03/31/moss-launches-covid-19-solutions-fund
Neil, C. H., Martin, F., & Daniel S., K. (2017, April 7). Software Citation Implementation Working Group. https://www.force11.org/group/software-citation-implementation-working-group
NIH. (2020a, April 30). NIH to Host Webinar on Sharing, Discovering, and Citing COVID-19 Data and Code in Generalist Repositories on April 24 | Data Science at NIH. https://datascience.nih.gov/news/nih-to-host-webinar-on-sharing-discovering-and-citing-covid-19-data-and-code-in-generalist-repositories-on-april-24
NIH. (2020b, April 30). NOT-OD-20-073: Notice of Special Interest (NOSI): Administrative Supplements to Support Enhancement of Software Tools for Open Science. https://grants.nih.gov/grants/guide/notice-files/NOT-OD-20-073.html
Nüst, D., Sochat, V., Marwick, B., Eglen, S., Head, T., & Hirst, T. (2020). Ten Simple Rules for Writing Dockerfiles for Reproducible Data Science. https://doi.org/10.31219/osf.io/fsd7t
Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285
Smith, A. M., Katz, D. S., Niemeyer, K. E., & FORCE11 Software Citation Working Group. (2016). Software citation principles. PeerJ Computer Science, 2, e86. https://doi.org/10.7717/peerj-cs.86
Software Heritage. (2020). Software heritage. https://www.softwareheritage.org/
Spaaks, J. H., Uekermann, B., & Geng, C. (2020). NLeSC/awesome-research-software-registries. Netherlands eScience Center. https://github.com/NLeSC/awesome-research-software-registries (Original work published 2019)
UK Research and Innovation. (2020, April 30). Get funding for ideas that address COVID-19. https://www.ukri.org/funding/funding-opportunities/ukri-open-call-for-research-and-innovation-ideas-to-address-covid-19/
Vitae. (2020, April 30). Concordat to Support the Career Development of Researchers [Landing page]. https://www.vitae.ac.uk/policy/concordat-to-support-the-career-development-of-researchers
Wellcome Trust. (2020, April 30). Outputs Management Plan—Grant Funding | Wellcome. https://wellcome.ac.uk/grant-funding/guidance/how-complete-outputs-management-plan
Wilkinson, M. D., Dumontier, M., Aalbersberg, Ij. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., Santos, L. B. da S., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., … Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 1–9. https://doi.org/10.1038/sdata.2016.18
Wilson, G., Bryan, J., Cranston, K., Kitzes, J., Nederbragt, L., & Teal, T. K. (2017). Good enough practices in scientific computing. PLOS Computational Biology, 13(6), e1005510. https://doi.org/10.1371/journal.pcbi.1005510
`;