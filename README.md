# React-Native_PersonalSpendingTrackerWithAnOCRReceiptScanner
Expense Tracker Utilising Optical Character Recognition 
1	Introduction
The existence of expensive technologies, rising costs of living and varying costs of everyday items between countries and even different areas of the same country (e.g. rural areas and urban areas). For example, “You would need around €2,960.97 (£2,619.41) in Belfast to maintain the same standard of life that you can have with €4,900.00 in Dublin” [1]. It is for these reasons that tracking and reviewing your expenses has become an essential part of controlling your personal finances and your future.
This application merits investigation as it is something that can be used more in today’s modern world. It is something that can be developed to a good standard and level of complexity while still leaving room for future features to get added i.e. An Analytics Solution. Additionally, improving on current applications in both functionality and design 
This is set to be a mobile app to ensure that the application can be used at any time at maximum convenience. From looking into current mobile apps that provide similar services like this, they have some large holes in UX\UI and lacking the utilisation of the technology being used such as Optical Character Recognition, reporting and search\filter capabilities.
The Optical Character Recognition will be the main technology in use and therefore the main selling point of the application. This will be one feature, to scan and read receipts. However, as this will enable auto-population of fields it greatly increases efficiency and ensures reliable, fast and easy data entry. The inclusion of OCR technology means that the application can be developed in a way that limits human error, increases efficiency and improve user satisfaction. While there are many apps that already utilise OCR technology for expense tracking, they fall short mainly for two reason:
•	They have a well-designed app that utilises OCR technology but doesn’t expand its uses enough for day-to-day tracking and travelling and does not provide categorisation of purchases from the OCR reading. For an example of this see Expensify which is a greatly designed app but does only work for expenses, trips and travel cost and the user would need a second account to also track personal finances.
•	They have made great use of OCR and used it for many different areas, however, their UX\UI is very poor and either lacks an appealing or professional aesthetic or the app does not have an intuitive flow. For an example of this, see the Smart Receipts App on Android and iOS.
Therefore, this project will investigate how to incorporate good utilisation of OCR technologies for all applicable areas while the UX and UI maintain a professional and appealing design.
1.1 Aims and Objectives 
The main aim of this project is to provide a software solution that will make tracking expenses when travelling easier, more accurate and easily accessible and usable to a wide array of people of varying abilities and capabilities.
In order to achieve this there are a list of objectives that need to be developed and achieved, in order:
•	A fully functional application that can be navigated easily navigated and is appealing to use and look at;
•	The application should be intuitive enough to be easily understood and used effectively by people of varying technical skills;
•	The ability to enter details of purchases and view previous purchases;
•	The ability to upload, store and retrieve a photo of receipts;
•	The user should be able to set a start and end date for a trip and assign this trip a recommended spending limit;
•	The ability to track day-to-day spending as well as travel expenses and review all data;
•	Utilisation of Optical Character Recognition (OCR) in order to autofill fields and minimise user input;
•	The ability to review and update data read in from the OCR feature. 
There are also optional objectives that should be viewed as “Nice-To-Haves” which are currently out-of-scope but should be reconsidered if time allows it:
•	An analytics solution that can give suggestions on saving and spending based on the users buying habits;
•	OCR that can interpret multiple languages for foreign trips. Should still be able to extract price but will be unable to assign category.
1.2 Literature review
This section information from reliable and checked sources will be reviewed to ensure the best planning and designing of this system can be carried out. There are also multiple mobile applications that already try to incorporate Optical Character Recognition (OCR) into expense tracking and other technologies within the app. These applications will be analysed, compared in terms of their use of technologies, how well they achieve the aims and objectives and their User Experience.
1.2.1 Mobile Applications
Mobile Applications (or “Apps”) have grown exponentially over recent years. It has done this through the consistent availability, the design becoming sleeker and better laid out, to also enabling much more complex technologies and features being included in simplistic ways that all users can understand. Apps are now being developed so well and as they are so convenient to use that they have fundamentally changed how we live our lives e.g. Uber replacing taxi companies and Airbnb replacing hotels. 
Firstly, when looking at App designs [7], we must take into consideration how people will use an app. Most importantly, it will be used on a phone or device in a user’s hand meaning it will be a small display when compared to traditional desktop development. This has led apps to be designed with all tasks broken down into smaller sections so that the display never gets overwhelming. This is also seen in how in general mobile apps are much more simplistic looking than their desktop counterparts. This is further expanded upon in the ‘Design’ section of this report.
After the design phase, it must be considered, what the potential for a user-friendly app is, in relation to “effort”. The fact is app users hate having to enter information especially if it is repetitive. Having looked at modern smartphones, almost all mobile website and applications enable the users’ phone to auto-complete information like your email, name and phone number based off what it knows about the user.                                                                                                             . This practice should also be implemented to the Travel Expense App to minimise all user input e.g. OCR should auto-complete type and price of purchase, date\time should autofill and as much other information as possible within the app. 
Lastly, another key aspect of App Development is Convenience. The app should be accessible at any time with no constraints i.e. a strong internet connection being needed. The ability to ensure an app can be accessed at any time, providing you have your phone, is a core principle of what an app should be. In this case, if the user is out for a meal in an area with bad coverage, he should still be able to use the app to read items and take a picture, even if it must be uploaded later.
1.2.2 Mobile Technologies
When designing mobile applications, we have many options that all have merits for different reasons. It is essential that these technologies are closely examined and compared for the correct choices to be made regarding the aims and objectives. The main elements that will be investigated are performance, compatibility with OCR technology, design limitations and overall advantages of the technology.
The main differentiation between mobile technologies is actually how adaptable they are to different platforms and devices, also known as being “Cross-Platform”, in comparison to “Native” Applications. 
1.2.2.1 Native Applications
When an application is said to be “Native” this means it was designed with a specific platform in mind and uses that platforms specific language. This can be seen by Apple specific application being written in Swift [5] to provide all Apple products with their intended design, aesthetic and maintain Apples “Safe Design” [5] of Apps. Another example of “Native Applications” can be seen in the standard Java [6] capabilities in Android Studio and the newly rising Native Technology of Kotlin [3] from JetBrains that is also available in Android Studio. Kotlin was actually built to improve on Java’s weaknesses of performance and provide more “developer-friendly” usage while also not compromising User Experience Capabilities [25].
In overall terms of Native Applications, specifically Swift and Kotlin, there are specific reasons why people use this despite limiting their audience. The main advantage is it targets the specific platform better and results in a more seamless and satisfactory User Experience while also allowing a maximum amount of customisation and improvements. The user experience should follow their specific guidelines: Apple’s Human Interface Guidelines [14] and Google’s Material Design Guidelines [15]. The platform specific development also means integration of the application to the desired device is much easier. As the desired device should have access to all required resources built into it. Therefore, installation will not require internet connection and will be faster that installations that require internet downloads in addition to installation of components. Lastly, native applications also utilise the devices resources, hardware and software in order to work offline, unless specific features require internet access e.g. an internet search within the app, however the majority of the application will still work.
In collaboration with this performance is usually to a high standard. Apple even states that “Swift is 2.6x faster than Objective-C and 8.4x faster than Python” [5]. This is also added to be the fact that Native Applications do not have to waste resources on converting elements or bridging modules as cross-platform applications do [24].
Lastly, Native Applications are more secure than most Cross-Platform Applications. This is due to the reliance hackers, viruses (both old and new) and other threats have on the use of classic web technologies such as HTML, CSS, standard JavaScript and jQuery. These technologies have been used for many years and thus weaknesses have been found and exploited and continue to be hacked to this day. Native Applications are newer with fewer experienced users and thus provide better data security for users.
However, despite native applications advantages, there are disadvantages that make it inapplicable for this project. Firstly, the development of a native application means alienating a large percentage of the potential audience. As of August 2019, Apple devices made up 47.14% of users’ devices [6]. This means that if a Native Solution is used roughly half of potential users are lost before even beginning. There are some solutions to this problem such as developing the application in multiple languages. However, for this project with its definitive due date and only one developer this would be wildly impractical in terms of time and resources.
Secondly, functionality is limited to the capabilities of the specific platform. For example; iPhone allows users to record their screen natively and no android device has this functionality natively. This demonstrates that even if two separate applications are created for a project, some functionality may be unavailable for specific platforms.
Thirdly, the costs of maintaining a native application are much greater than a cross-platform application. If you created multiple applications in different languages, you have to double the effort for updates and patches to a devices’ hardware and Operating System.
Lastly, native applications, while working great with their platform specific libraries and plugins, do not always support outside third party plugins. This is very poorly suited to this project because, although we have not yet decided on an Optical Character Recognition technology, the odds of it not working with a native solution are much higher than some of the researched cross-platform solutions.
1.2.2.2 Cross Platform Applications
Cross Platform Applications [16] is a very broad name given to applications that can run on multiple platforms. In this case, we are referring to fully cross platform and cross compiling applications. This means that the apps will work on all platforms and be compiled for any platform e.g. Microsoft .NET’s Common Language Runtime (CLR). There are many technologies that do this, but they are all carried out in different ways.
The technology this project will investigate for creating Cross-Platform Applications is React Native. React Native is based off the ReactJS (derived from JavaScript) library and was created by Facebook. As ReactJS works using JavaScript to interact with web components, React Native does the same thing except with native components as well [44]. The key difference between ReactJS and React Native is that ReactJS is simply a library but React Native is a full framework [17].Design is more complex than with a native application. This is due to Apple and Googles Design Guidelines. They both differ on certain elements such as the header of google apps being separate from the app while iOS devices integrate the header with any application. In order to design this correctly, common ground must be found and both design guidelines must be considered when making UI\UX decisions.
React-Native is growing exponentially among developers and in industry overall, see Figure 1.2.2.2. This is mainly due to the UI\UX freedom it provides, its lightweight capabilities from a single codebase, a near-native performance and the general usability for developers.





React Native is renowned as having the closest User Experience to a Native Application [11]. It is used by Facebook themselves and when comparing Facebook on iOS and Android we can see how similar the applications appear while maintaining their native elements like a header or formatting, for an example see Figure 1.2.2.1.
React-Native is also much more performant than other Cross-Platform Technologies. The main reason for this is that React-Native can convert components and use a “bridge” [23] so that this can be done from a single codebase (see Figure 1.2.2.3). This results in it being much more lightweight and performant than technologies such as Xamarin which will use Xamarin.iOS, Xamarin.Android to double the compiling size and the actual codebase size.





Lastly, while other technologies such as Ionic and AngularJS can create Cross-Platform Applications, they are not as performant as React-Native and impose UI\UX limitations that React-Native does not. However, the main reason React-Native was chosen over these technologies was due to this project’s timeline. ReactJS has been used by the developer of this project before making for a less steep learning curve. Additionally, React-Native enables “Hot Reloading” [22] which these technologies do not hindering building and time associated with testing changes. 
1.2.3 Optical Character Recognition
The principle of modern Image Processing that evolved into Optical Character Recognition technology was initially formed in 1974 by Ray Kurzweil at his company Kurzweil Computer Products, Inc. This method has changed greatly since then and now is no longer referred to as Image Processing but rather Pattern Recognition [26]. This is the practice of uploading an image, (which if not in a suitable format like bitmap will be converted) and then assigning them recognised values in accordance with the OCR technology’s own dataset [42]. This dataset is where the recognised numbers, letters and symbols reside in the system. The characters consist of multiple handwriting styles and computer fonts for each of them in order to be able to recognise as much formats as possible.
Optical Character Recognition technology is great for identifying characters and converting them to text that is fully readable by a machine. However, OCR alone has a very high error rate, relative to how important accuracy is in reading cases. This is largely due to the conversion into a character in its dataset which may cause corruption or a false positive reading. For example, say a line of handwritten text contains the number ‘1’ but due to the writers handwriting it looks most similar to the third character in the number ‘7’ dataset and thus the machine assigns it a value of 7. Other examples of corruptions leading to misreading’s include image resizing and thus unreadable, similar looking characters (‘b’ and ‘6’ or ‘5’ and ‘S’). This is especially concerning for this project as working with receipts false positives or incorrect number calculations could ruin the data held in the application.
1.2.3.1 K-Nearest Neighbours Algorithm
In order to counteract the error rates of standard OCR, K-Nearest Neighbours (KNN) Algorithm is used for error detection and error correction. K-Nearest Neighbours Algorithm is the next step in OCR technologies based upon Pythons Machine Learning capabilities and has vastly improved how the datasets classify data [26]. 
K-Nearest Neighbour is known as a “non-parametric, lazy learning algorithm” [42] meaning it does not make any presumptions about the data being fed to it and keeps the actual algorithm as simple as possible, only building a data model when it is time for a prediction. KNN works by assigning a small positive integer to “K” and then uses this to then recursively check the database for all entries most similar to this data. The algorithm then finds most common classification of these entries and assigns that classification to this data. Then, using machine learning it can grow its overall dataset in a process known as “training” [42]. This training is simply the algorithm adding to its dataset of classified characters. For a further look into the “training” process see Figure 1.2.3.1 below. 



Advantages of KNN
•	Constantly evolving and improving due to growing datasets and classifications;
•	No assumptions made about data, good for non-linear data;
•	Use of Regression and Classification makes it very adaptable to many situations;
•	KNN is simplistic while also being accurate & improving on standard OCR;
Disadvantages of KNN
•	Slow Predictions due to building a data model for every predication;
•	Can be “Sensitive” to scaling of data.
1.2.3.2 OpenCV
OpenCV, or Open Source Computer Vision Library, is an open source library created by Intel. It provides free algorithms for computer vision and machine learning that are fully modifiable by the customer. [29]
OpenCV could be greatly utilised in this project due to two of its algorithms; a Text Detection Algorithm and a Text Recognition Algorithm. Both of these algorithms use Edge Detection [27] (specifically Canny Edge Detection) to split apart areas, words, lines…etc. Firstly, the text detection algorithm will allow for any outside noise around the image to be cancelled out as it only focuses on the text elements. It does this by converting the images to greyscale to avoid light confusion, applying “smooth contours” and then sorts this list of contours. A finished example of a text detected image can be viewed in Figure 1.2.3.2. This is good for converting the image into more readable sections of text only. 




The other algorithm is Text Recognition. Text recognition in OpenCV can be broken down into two steps; firstly, it uses “Line Segmentation” [36] to break the text down into horizontal lines so that when reading in text we maintain the lines as intended. For Example, on a receipt the “Total” text and the price will be on the same line despite being on the left and right hand side of the receipt respectively. 
The next step for text recognition is to carry out “Word Segmentation” [36]. This step involves breaking down each line found in “Line Segmentation” into words. This is a vertical scan that groups around words based upon edges left from spacing. This practice is great for printed materials however, it is not great for handwritten lines which may not have forced spacing. Thankfully, this project is dealing with receipts which are usually printed text.
The final area of text recognition is called “Character Segmentation” [36]. Like previously, this using edge detecting and takes the words from the previous “Word Segmentation” section and breaks them down into specific characters. It is from here that the OCR engine and algorithms can take the characters and use their trained data to assign them a machine-readable value and return them to the position they were taken from.




With all the technologies combined the accuracy rating from CVISION has “shown an OCR accuracy rate of ninety eight percent” [38].
1.3 Conclusion
From this literature review, it is seen that, the accessibility of using a mobile application is paramount in this instance. Also, in order to have an application which is performant enough to handle image uploads and retrievals while maintaining the User Experience, this project will utilise React-Native technology. Lastly, the use of OCR technology should be implemented for the betterment of the system and to limit “human effort” and should be accurate enough to limit “human error”. So, moving forward we will be creating a mobile application using React-Native and implementing OCR technology.
2	Requirement Analysis
In order to ensure the aims and objectives of this project are consistently worked towards achieving there must be clearly defined and practical\feasible requirements. This will include interacting with potential users to gauge what they actually want from a system like this. Following this the findings will be extrapolated, examined and placed into requirements based off of necessity and practicality.
2.1 Feasibility Study 
A feasibility study is used to assess the overall projects aims and objects to ensure they are possible for the project’s resources and timescale [20]. This has been done by breaking done the project areas into the following sections.
The full feasibility, detailing the legal feasibility relating to copyrighted intellectual property and sensitive data and the organisational feasibility relating to this projects time scale, can be found in the Appendix 9.5.3. The main findings of these sections was that there was no risk while complying with the Data Protection Act [54] and Copyright laws [53] for legality. Additionally, organisational concerns have been mitigated against due to enough planning including a breakdown of requirements into “Need-To-Have” and “Nice-To-Have” categories. The main area of our feasibility study is around technical feasibility. This refers to the actual ability to finish the project with the technology stack selected and within the timeframe. The main findings of this section were that using new technologies such as React-Native with required functionality, Firebase and OCR capabilities may be difficult under the designated timeframe. However, these have mitigated against due to the creation of a project plan including training and leaving room for bug fixes. Additionally, as experience has been had involving ReactJS and Mobile technologies covers mobile development involving Firebase, the training will not need to be overly extensive. All elements relating to this section but not solely belonging to “Technical Feasibility” have been assessed in the Risk Analysis section and Appendix 9.6, other findings can be found in the Technical Feasibility section of the Appendix 9.5.3.
In summation, all elements raised in the feasibility study have either been deemed as not a risk, not applicable or if there is concerns then appropriate steps have been taken to mitigate against them.
2.2 Requirements Gathering
Requirements Gathering can be done in many ways e.g. interviews, focus groups, questionnaires, observations…etc. The purpose of this stage is to understand fully how the system should work and what the end user wishes to gain from this application.
2.2.1 Methods that will not be used 
Interviews will not be used for this section. This is largely due to how time consuming conducting multiple interviews would be including finding relevant participants. Another reason for this is due to bias. There are much more people, known by people involved in this project, that do not have an expense account and would only want the system for personal finance tracking. This would create an unfair bias towards that area of the system that is unwanted at this stage. 
It is worth noting that without an interviews ability to ask to follow up questions and gauge reactions the questionnaires should attempt to have as much room for user feedback and specification as possible. 
2.2.1 Methods Used 
Questionnaires
A Survey has been created to get user feedback in regards expense tracking. This survey is used to determine what the actual demographic of this application is and what matters to that demographic. The survey, its results and what was taken from this can be found in the Appendix in Section 9.5.
Brainstorming Session
The brainstorming session for this project was conducted to get all ideas relating to requirements out so that they can be researched and evaluated. This was done on paper using a spider-graph and converted into a digital Mind-Map, a copy of this is available in the Appendix 9.5.1.
Sampling of Other Applications
The applications that were sampled here are Expensify, Cleo, SmartReceipt and YouNeedABudget (YNAB). The main goal of this technique was to determine what these applications are lacking that could be incorporated into this application and what elements are executed well that could be learnt from.
The main findings of this investigation were that UI\UX is lacking in many applications making them much less appealing. Additionally, in terms of functionality, reporting\statistical data representation, searching and OCR scanning appear to be essential for an efficient application. This is something many applications do well, but others fall short on i.e. SmartReceipts. Lastly, “Nice-To-Have” functionality was seen in YNAB with multiple language capabilities and
The full list of findings for all these techniques can be found in Appendix 9.5.2. 
In summation, the features and findings are the main results of the fact-finding methods. All Features found have been defined as either ‘Need-To-Have’ and ‘Nice-To-Have’ priority based upon their value to the application and its overall goals. However, further findings including mobility concerns, analytics and multi-languages have also been highlighted and can be found in the Appendix 9.5.2.
2.3 Requirements
Now that the requirements gathering has been done, we will take the information and determine our requirements based off our findings. We have broken these results into functional and non-functional requirements for both the user and the system. These can be found in the Appendix 9.1 including a system specification.
2.3.1 Use-case Diagram
Use-Case Diagrams [18] is an essential part of designing a system. It gives an idea of how processes should be carried out. The Use-Cases (located in the Appendix 9.2). The main use-case shows how a user may enter a purchase, either manually or by scanning a receipt. As this is the most key element of the system.
2.4 Project Plan
As previously stated, the waterfall method has been selected to create this software. This will be used loosely to allow for any unforeseen circumstances or roadblocks to be worked around. This plan is based on our time scale, our aims and objectives and will be displayed via the following diagrams.                                                                                                                                                  Overall, the project plan has been formulated based on the Gantt chart (Appendix 9.7), the requirements and the Aims and Objectives. From this plan there have been further aids created in the form of a Work Breakdown Schedule and an Activity Network Diagram to assist in ordering work and making it easy to understand the best way to organise the work. In addition to these, an ordered list of project deliverables and estimated date of completion has been created to provide goals to work towards. These can all be found in the Appendix Section 9.7.
2.5 Risk Analysis
A Risk Analysis [19] is important for any project because if the unexpected should happen then there must be actions to counteract any hindrance caused. Risk Analysis is usually seen as reacting to “Human Error” or “Human Failure” in relevance to the projects timescale for whatever reason. However, for this analysis, hardware failures, software failures and other additional features have been considered to give a wider scope to plan for.
Risk Analysis has been carried out on this project for the provided timescale. This is to ensure that issues that may arise have been considered. Additionally, the risk analysis includes the steps taken to ensure these issues will either not happen or that there will be time to work around the issue. The takeaway from the risk analysis is that there are now high-level threats that are probable to happen. If the worst situations should happen then steps have now been planned in order to not hinder this project too much. The full risk analysis, including risk level, steps to counteract...etc., can be found in the Appendix 9.6.
2.6 Conclusion
In Conclusion, with the findings of the requirements gathering section, there are not fully defined requirements relevant to the end users’ needs and the system’s needs. These requirements have enabled planning to begin. It is believed with the expected functionality laid out within the desired timeframe that our projected plan is very reasonable, however, risks and outside interferences have been considered and mitigated against.
3	Design
Design is the essential element of software development. Without adequate design and planning then the system is unlikely to meet most of its goals or deadlines and will likely fail before starting [28]. For this reason, this section will be completed before developing. 
3.1 Design Methodologies
In order to ensure what is set out to be delivered can be achieved, the appropriate Design Methodology [55] must be selected. The selected method will be the core of the project plan, the structure of the overall project and lay out the best way to develop the application with the resources available and limitations in place.
3.1.1 Design Method Chosen
Since this project is a single-person endeavour, the traditional waterfall method has been chosen. However, this does not mean it needs to be followed in every regard. In terms of actual task break down and allocation, approximately 70% of time will be allocated like with agile methods and this will allow for errors, updates or moving other work up sooner as needed.                                                                                                                    Additionally, the agile ideals of the Spiral (See Appendix 9.3) and Scrum Methods will be incorporated via testing intermittently and consistently in order to be proactive with bug fixes.
3.2 Mobile User Experiences
Traditionally, software was developed thinking about a desktop using a keyboard, mouse and monitor. Now in the age of Mobile Apps there needs to be a second train of thought that considers the many different screens such as phones, laptops, tablets…etc. and many different ways of using devices e.g. Phones are now touchscreen and handheld whereas laptops\desktops use a keyboard and may or may not be touchscreen.
Firstly, as this is a mobile phone application, we will look into how the layout of an app can affect a user’s experience. The position a user holds a phone as well as their dominant hand can determine what areas are harder to reach. See figure 3.2.1. This can help inform the layout of the system and ensure it is designed with ease-of-use in mind. This problem will only get worse with time as the evolution of phones shows (Figure 3.2.2). Therefore, this must be factored in now before it becomes a much larger issue in future updates\phones.






Additionally, as the target audience of this project is wide and varied among any number of people, accessibility must be considered. Accessibility is the end user’s ability to use the system despite any physical or mental limitations they may have. A common example of this is colour blindness which affects ‘8% of males and 0.5% of females’ [13]. This is nearly 10% of possible users alienated before even fully using the application. For this reason, conflicting colours, such as reds and greens as the most common example, should be avoided in favour of colours that are easily distinguishable from each other. To combat the difficulties of colour blindness in design this application will avoid the colour schemes shown below in Figure 3.2.3 as well as not relaying on colours to distinguish between elements or show errors and instead using spacing, thick lines\borders and messages\icons to ensure this application is fully adaptable.
 


3.3 Mobile Design Standards
The most common mistake made in mobile app design is thinking about it like a responsive web page and not like a mobile app. These are two distinctly different software elements. The main relationship that industry sees is that “you can use an app design for a website, but you cannot use a web design for an app”. This is largely due to apps not having the space or number of pages that a website may have. Whereas a website can have very few pages like an app and components can be scaled to fit the page properly.
As this project is a cross-platform application, these standards between web design and mobile app design must be considered in order to provide a fully complete cross-platform application for Web and Device.
In terms of Cross-Platform development for devices there are two bodies which must be followed; for iOS Apple’s Human Interface Guidelines [14] and for Android Google’s Material Design Guidelines [15]. These standards have common design principles and some that are specific to their own platform. This application will require some standards from each Guideline in order to create a uniform design. As these are guidelines and not definitive practices this will not impact the overall design providing a reasonable choice is made.
3.3.1 Common Design Principles
The main principles that were common to both iOS and Android were clarity, flow\layout, depth without overloading on page number, Consistency, Stability, Common Components (Including: Cards, Icons, Tab Control, Lists). 
As these elements are the same in all platforms, there is no steps to take around them. To view a full explanation into what makes these elements common to both please see the Appendix 9.10. Overall, the main goal of all designs in Mobile Applications is to follow the Keep It Simple (KISS) model [41]. As Mobile Apps are lightweight, they should not contain overly complex pages or activities while also containing concise language and intuitive design to make them accessible to a wide audience.
3.3.2 Specific Design Principles
The main differing components found were: Headers (iOS incorporates header, android keeps it separate), Navigation (iOS Bottom Oriented and Android Top Orientated), Floating Action Button (FAB Positioning), Exiting of An App (Home Button or not), Navigation Bar Screen Position (iOS Bottom Oriented and Android Top Orientated), Typefaces Used, Visual Component Execution (Including: Radio Button Vs Switch, Radio Button Vs Tic Symbol, List Design). 
For each of these elements a decision was made on which principle should be followed. The justifications of these can be found in Appendix 9.10. As these are more guidelines than hard rules, the principle suiting this applications needs and the user experience components from section 3.2 were selected. 
3.4 Prototype Designs
Before the prototype designs could begin Use-Case Diagrams were created to give an overview of what was to be designed. These can be found in the appendix.
3.4.1 Low-Fidelity Wireframe
This wireframes for this project show the initial design of the application and give a good idea towards how the system should feel and flow. As previously stated, the design is simple, easy to read and does not include a lot of features on page. Low-Fidelity Wireframes for all the applications pages and selective widgets can be found in the Appendix 9.7.
3.4.2 High-Fidelity Prototype
This High-Fidelity Design (See Appendix 9.7) shows how the low-fidelity wireframe evolved when designing in the IDE environment. Changes were made to the initial design based upon how well they fit to a single screen of an app; as demonstrated by the charts in the home screen being above each other and not alongside each other like in the low-fidelity design.                                                                                  Additionally, the Dropdown Menu has been moved to the other side of the screen. This was done to reduce the amount of ‘effort’ for users, this justification was further explained in section 3.2 regarding minimal ‘effort’.
3.5   System Architecture
The overall goal of designing a system architecture is to understand what is needed within the system to be developed and what is needed for the end-user of the system. Through designing a client-server model, the key aspects of the applications functionality and required interactions will become easier to understand. Additionally, from designing a database diagram it will become apparent how data will be stored and retrieved. Selecting an appropriate database to work with on this will also enable an evaluation of this databases capabilities and apply them, where applicable, to this application.  To view this, please see Appendix 9.11.
3.5.1   Client-Server Model
The Client-Server Model was designed to outline how the application will interact with separate components required for the required functionality. The first element that was highlighted was the use of the users’ camera and photo library which the user must grant permission for and is essential to receipt scanning.
The next element involves the use of OpenCV for image and pattern scanning. This should gotten from the internet to install when the rest of the application is installing on the device along with all React-Native libraries specified in the “node_modules” folder of the application. Every specified component should be installed directly on the device [43] when downloading the application (with an internet connection) and thus no external calls, i.e. TCP\IP calls across the internet, should be required for the application to run. This is essential to add the benefit of offline use of the application. It also ensures performance is efficiently managed by using local resources rather than making internet\API calls for resources [46]. There is also security benefits to not making calls across the internet [45] which are essential to this application dealing with people’s personal expenditures.
The final element highlighted in the Client-Server Model is the interactions with the Firebase Database. This happens upon entry on the app as it retrieves\refreshes data for the home pages graphs and upon entry of a list page (i.e. Trips and Purchase initial screens). While the retrieval of data comes consistently without user interaction; sending data to the database only comes when the user adds\edits\deletes an entry.
3.5.2   Database Design
The Database Design consisted mainly of a Database Entity-Relationship Diagram and the justification for the design (See Appendix) and research into what database was desired. Firebase was chosen. As a JSON based database, Firebase does not fully use relation database design, this is still used to show how the database should function and give an idea of how it will be interacted with. 
As seen from the Appendix, the Users table will use their email address as a primary key alongside personal data and their phone number for possible multi-factor authentication. Using the email as the primary key was a conscious decision as, in the future, this can allow for sign-up via Facebook or other social media that uses an email.
In addition to designing a database diagram, investigation into the database platform was carried out to determine what database system best suited this applications’ requirements. The selected database was Googles’ Firebase. Firebase is a Cloud Database that stores files in a JavaScript Object Notation (JSON) format. The main benefits in relation to this applications purpose have been outlined in the Appendix 9.9.
3.6 Conclusion
In conclusion, the design of this application has been drafted using the Waterfall method with agile capacities, reviewed against standards and accepted. Due to the design not being fully implemented; changes will be considered if they arise while developing. Any changes will be reviewed against the Common and Specific Design Principles (Section 3.3) as well as ensuring the change matches the User Experience (Section 3.2). Additionally, the database design (Section 3.5.2) and applications interaction (Section 3.5.1) have been incorporated into the design in order to determine how best to fit all elements into the design. Lastly, a Low-Fidelity Prototype was created that then evolved into a High-Fidelity Prototype developed with React-Native and adhering to the design standards and user experience specified.


4 Testing
This is now the testing section of the Waterfall Lifecycle. It will extensively test all components of the application and document all findings before finishing. This is in accordance with the Waterfall Model. However, as stated, Agile principles are still being used where applicable. In this case, upon release bugs may be found which can be fixed with a patch or new version release.
This app was tested on both emulated and real devices to ensure there would be no unforeseen issues with the application upon release. The project was developed with React-Native as a cross platform application with a large target audience in mind. As such, mobile operating systems have different standards: Apples iOS is usually up to date (currently iOS 13) with this update rolled out across all devices. However, Android does not adhere to such standards and  therefore the app will therefore require some form of backwards compatibility.
During testing, the app was able to function with all android versions starting from Android 4.1 (API 16 – Jellybean), which was released in 2012, until the most recent release. This matches what is stated in React-Natives official GitHub page [1]. Therefore, users with android phones from before 2012 would not be able to fully utilise this app. Figure 4.1 and 4.2 show that this accounts for only 0.6% of Android Users. Due to this low number the associated risks of continuing without fully comprehensive backwards compatibility have been accepted and mitigated against at this time.







4.1 Hardware
4.1.1 Required Hardware
The only hardware this project requires, after the phone itself, is a functional camera. This is essential for users which want to take full advantage of storing and scanning receipts. In the cases of Smartphones, which the app is designed for, this is very rare with only a few examples such as the INO 5 Smartphones and the Dupad Story Marshall Smartphones [3]. However, this was mitigated against as users can still use the app. The user would just have to manually enter purchase details.
4.2 Software
The software is the focus on this project and thus must be rigorously tested to ensure functionality acts is as intended, the design is intuitive and understandable, any calculations are correct and lastly that there are no breaking bugs in the project.
4.2.1 Automated Testing
React-Native allows for automated testing in an App-Test.js file. This file can be run when executing the code to ensure there are no breaking changes and enforce consistency. It can be run as part of a test suite to enable “Built-In Quality” [4] assurance and find any potential bugs. Additionally, tests in React-Native are separated into “describe” blocks which contain “it” blocks. These allow for separation of tests, easy reading of results and the ability to run only specified tests. These automated tests are mainly achieved through two techniques.                          Firstly, it tests the compilation and rendering of the project. It starts with the overall App.js file which initializes the entire app. This then can check to ensure no undeclared, undefined or misused variables, imports or classes are used throughout the project. This technique can also be used on a per page basis. When used like this it checks each page individually and ensure that each of these pages can render on their own including each visual elements’ attributes. The way this is achieved can be seen in Figure 4.2.1.1.



	


The other method implemented is to test the actual functions within the project. This is simply done by importing the file they reside in, calling the specified function and feeding it test data where we know the output. If the output doesn’t return the expected value, it will fail. A slight Example of this can be seen in Figure 4.2.1.3. A full example of this can be seen in in the Appendix Section Automated Tests relating to how the validation functions are tested.                                                                                                 



In conclusion, all automated tests have passed for this application and the results have also been verified manually. The creation of these automated has lessened the burden of extensive manual testing and has allowed for some Built-In Quality to be incorporated into this project.
4.2.2 Manual Testing
Some tests of this project have not been automated either due to the complexity of the components and\or time constraints. The remaining tests have been manually tested. These tests include, where applicable, error testing, boundary testing, edge case testing and acceptance testing. The following is a list of the areas manually tested and the acceptance criteria that they have passed in order to deem them acceptable for use and ensure they do not contain any high priority bugs;
	Intended Outcome	Additional Validation	Result	Pass /Fail
Home Page & Graphs	Text Fields populate 
Graphs populate with data as intended and reflect the data in Firebase.	Updates while using the app, i.e. updated data also updates the home screen in real-time	As Intended	Pass
Switch Between Trips and Personal	Clicking the switch shows only relevant information i.e. only purchases from trips.
Switch represents Page i.e. on the trips page it will always be set to trips.
Lastly, when adding a purchase, the switch will enable the user to select a trip to assign it to or hide this feature entirely.	When adding a trip purchase, only Trips that are current, upcoming or recently ended (within 2 days) will be added to dropdown choices.	As Intended	Pass
Searches	Searches on both purchases and trips show all trips which contain that keyword, letter or phrase.	No matches will show an empty list. When search bar’s cleared, all records are shown	As Intended	Pass
Purchase Add	If successful, the entry is added to firebase and the user is navigated to the purchase display screen where they can see their entry.
If unsuccessful the user will be prompted as to why and if it is validation the box will have red to indicate it.	Other validation for user input is explained in automated testing.
User will be prompted as to what exactly was not acceptable input.	As Intended	Pass
OCR	When any picture is uploaded it is scanned and the app attempt to assign values to fields.
On Success, all intended fields are filled with information relating to the receipt.
On Unreadable image, no fields are updated.	Works for stored photos and newly taken photos within the app. This requires a physical device as emulated devices cannot take photos.	As Intended	Pass
Purchase Delete	Swiping from left to right on a purchase brings up a confirmation prompt.
On Confirmed, the record is deleted, and the list is updated. If it was unable to delete the record this will be prompted to the user.
On Cancelled, no deletion should occur.	The Swipe functionality works as intended and links specifically to each individual record.	As Intended	Pass
Update A Trip	On Success, the record is updated and can be seen to be updated in the list.
On Failure, the user is prompted as to why this was not updated.	Other validation for user input is explained in automated testing. User is prompted as to what exactly was not acceptable input.	As Intended	Pass
Cancel A Trip	Cancelling a Trip from the pop-up modal should bring up a confirmation box.
On Confirmed, the record is updated, and the list is updated to move the trip to the cancelled section. If it was unable to delete the record this will be prompted to the user.
On Cancelled, no cancellation should occur.	The user should not be able to cancel a trip that was already cancelled.	As Intended	Pass
Update Category 	From the settings page users can add their own custom categories.	Other validation explained in automated testing.	As Intended	Pass
Offline Capability	When the user has no internet connectivity, unless registering or logging in, this will not impact their ability to work and instead take a copy of the database locally to be synced when there is a connection	N\A	As Intended	Pass
These test results cover the unique elements of this application. For more extensive test results see the Appendix Section Manual Testing.
4.2.4 Platform Testing
As this device was primarily developed using android studio and an emulated device, it now had to also be verified to work on a physical device and an iOS device. The results were:
•	When run on the android device there were no issues and the app worked as intended.
•	When run on the iOS device there were some issues regarding the permissions not allowing access to the camera. This was due to XCode project having their own manifest file to handle permissions. Once this file, info.plist, was updated with the correct permissions the app worked as intended.
In Summary, this project has been verified to work across real devices and has succeeded in being cross-platform.
4.2.5 Security Testing
Security is an integral part of every app in the current world and users are particularly protective of their data. This is very applicable to this project as it handles the users’ personal purchases which they may not want others to know. For this reason, the security of this app was evaluated.
Firstly, the avoidance of using any APIs was evaluated and seen that this did lessen the chance of people being able to target the user through internet calls or requests. This has limited the potential number of threats that can impact this app.
Additionally, as this project uses firebase, the database interactions, when online, are handled by Google themselves. This includes ensuring everything sent to the database is either a number or is interpreted as a plain text string. This can help to prevent SQL Injection attacks and other attacks which require specific input.
Lastly, the authentication system of Firebase means that only signed in users are able to change data. While a user could, in theory, sign-in to their account and attempt to cause damage this is handled in the code to only ever allow them access to entries under their own unique ID. Therefore, all data is protected from intentional or unintentional misuse.
In summary, this project is mostly self-contained which the exclusion of APIs and when interacting with the database the storing and retrieving of data is always interpreted as plain text limiting the chances of a malicious attack.










5 Evaluation
In this section the work completed will be compared with what was planned. This will then lead to determining how successful this project was in relation to the standard of work, the time frame allowed and the opinion of potential users.
5.1 Requirements
Here the requirements previously defined (See Appendix 9.1) in the analysis section will be compared with the finished product to ensure all essential criteria has been met and evaluate any missing requirements.
5.1.1 User Requirements
Firstly, this section aims to analyse how well the users’ requirements were met. Many user requirements have been discussed in the testing section therefore they will only be elaborated on here if required. 
Functional	Intended Functionality	Actual Functionality	Evaluation
Purchases	Able to add, update and delete purchases. 
All input is validated.	All delivered with no bugs.
Additionally, the swipe method of deletion was added to adhere to expected standards.	Requirement met and improved upon. See 5.2
Trips	Able to add, update, cancel trips & set spending limits. 
All input is validated.	All delivered with no bugs.
Spending limit also notified on home page and goes red if over-budget	Requirement met.
Login\
Register	Able to register and login to app with no issues.
All input is validated.	Delivered with no bugs. Additionally, login persists to minimise number of logins required	Requirement met and improved upon.
Searching	Able to search from specific fields for trips and purchases	Delivered with no bugs. Also, the searches now search all fields from one search bar correctly.	Requirement met and improved upon.
Visual
Feedback	Effective use of icons, message boxes and changing colours\icons.	Delivered as intended. Icons used for refreshing\loading, floating action buttons used, descriptive message boxes and on invalid input text boxes change colour.	Requirement met.
Reporting	A good reporting of user data should be used to effectively convey the users’ data back to them.	Delivered with no bugs.
The text fields denote users’ budget and how much they have spent. The pie charts show how much left they can spend in each area. The line charts show overall spending over a specific time. 	Requirement met & improved on as it is intuitive (only shows trip budget if there is a trip ongoing)

Non-Functional	Intended Functionality	Actual Functionality	Evaluation
User Interface	Designed to be intuitive and appealing to look at.	From User Feedback this design is “easy to understand”, “Nice” and “Has a good flow”.	Requirement met 
Offline Capability	No Internet Access or poor signal should not 	No APIs used and Firebases copy\sync database used. Network only required to sign up and initially login.	Requirement met.
In summation, all user requirements have been met and some have even been improved upon. Feedback from users has been positive and stated their needs have been met.


8.1.2 System Requirements
Functional	Intended Functionality	Delivered Functionality	Evaluation
OCR	This includes two features:
Auto-Fill Fields – OCR Scanning of receipts should enable smart filling of fields to save the users time.
Quick & Accurate Scans – Scans should be quick with a high level of accuracy.	Auto-Fill Fields – A successful scan will assign the purchase title (if not already entered), the total, currency, purchase date and the category (if able, otherwise set to “Other…”). This is all the required fields. Thus this was deemed as much as possibly could be done without impacting performance.
Quick & Accurate Scans – Scans are quick with a high level of accuracy. This is further evaluated in Section 5.2 Quality of Work.	Requirement met.
Categories	This includes two features:
Categorise Purchases from scans – Should be able to decide, to some degree, what category the purchase belongs to.
Add Custom Categories – Users should be able to add their own categories and use these across the app.	Add Custom Categories – This can be accessed from the settings page & simply enter the category they want, which can then be used across the app.
Categorise Purchases from scans – this does work and categorises purchases based on items and looking for keywords. If it cannot assign the category it simply sets it to “Other…”. 
While this works for most situations it can miss instances where there’s a misreading or different keyword is used.	Requirement met but could be improved. See Section 5.4 Future Work.
Minimal External Dependency	The App should be self-sufficient. It should not rely on resources from across the internet. 	This was done through avoiding APIs in favour of installed modules for internal access. To add to the database, it does require internet calls however offline capabilities limit this.	Requirement met.
Can Work Without A Camera	While scanning receipts is a good feature, it should not be integral to the apps purpose. Users can manually enter purchases to the same effect as scanning.	This was achieved as intended. The user can simply manually enter all the details.
They can click the “Scan Receipt” Button. However, if they do not have a camera, they will not be able to grant camera permissions and thus a message will tell them they cannot scan receipts.	Requirement met.
Persistent Login	Once logged in – Users will not have to login again until they either logout or use a new device.	This works as intended. It does this by associating the device with a login and while Firebase states the user never logged out it will be able to log them in automatically.	Requirement met.
Error
Tolerance	In the event or invalid input, network issues or any error, the system should handle it and not crash.	This was achieved through data validation checks to ensure data is correct before adding it. Additionally, using try-then-catch blocks around functional code with specific and generic error handling enabled unforeseen issues to be caught and avoid the app crashing.	Requirement met.

Non-Functional	Intended Functionality	Delivered Functionality	Evaluation
Performance	To measure this the system should have:
-No Timeout Issues 
-Quick Response Times
-Low Load Times	This was delivered as intended. There are no timeout issues with any functionality, even for large processes such as OCR Scanning.
All responses are immediate & pages load seamlessly.	Requirement met.
Design Standards	Apple’s Human Interface Guidelines [14] and Google’s Material Design Guidelines [15] should be adhered to where appropriate, elsewhere, the design should limit the “effort” required by the user.	This was achieved as intended.
The decisions made when iOS and Android Designs conflict were based upon users’ “effort” and the overall user experience. This resulted in a bottom tab navigation and floating action buttons anchored to the bottom right of the screen for easy access.	Requirement met.
Adaptable Across Devices	The functionality and the design should be consistent across varying devices.	React-Native handles the functionality across devices and when tested this was validated.
The design across devices is maintained using the built-in dimensions of the device in order to assign padding, spacing and sizes. Below is an example of this code:
const{width}=Dimensions.get('window');	Requirement met.
Data is Valid, Secure & Persistent	Data shown to the user is correct, it is theirs, it is easy to understand, and it persists i.e. the app crashing does not invalidate all data.
The hosting of data should also be secure.	This is delivered as intended through a good UI and separation of user data via unique ID.
The use of Firebase to store data means data will persist. However, if data is lost while offline and it did not sync with the database then some data may be lost. 
Firebase handles data hosting. As such Google maintains the hosting security.	Requirement met. 
In conclusion, the essential requirements for this project have been met to an acceptable standard. In the cases where some debate on how well it has been met can be had, the reasoning for its implementation method is explained and if it definitively could be improved it is mentioned in the Section 5.4 Future Work.
5.2 Quality of Work
After evaluating work and factoring in the opinion of people surveyed, this project has been done to a high standard and the quality of each of the features is very high and fitting with both the industry standards and what mobile app users expect i.e. the swipe to delete feature.
5.2.1 OCR                                                                                                                                        …                                                                        The system does use OCR, specifically OpenCV’s TesseractOCR, to scan receipts. This process takes very little time and can go almost unnoticed by the user. The accuracy of this has been extensively tested to verify that the output is as intended.
Firstly, this was evaluated with multiple receipts of varying quality and clarity and the results were that it could almost always scan and get the minimum information required (currency, price and receipt name) with no issue. This was seen to be due to how distinctive currency symbols and numbers are to the OCR Engines Trained Data. Additionally, the receipt name was able to populate due to not having many restrictions on what it could be i.e. providing a name wasn’t already filled out, it populated just the first line from the receipt as this would usually be the establishments’ name.
The only other situation where the scans do not seem to work correctly is when the scanned object has a black background. This is because OpenCV converts images to greyscale before beginning pattern recognition and when the background is black this is much harder to do. However, this was an edge case as all physical receipts are usually in white and so are online receipt. The only case this may impact the user is if they are scanning an online receipt from a browser or email when they have dark mode enabled. Due to this being a very rare real-world situation it was documented and mentioned for future work.
Secondly, this was evaluated by taking the entire text output of multiple receipts and reviewing how many characters were as intended. As seen from Appendix () this was a very high accuracy rate with approximately 400 characters only 3 characters were off (excluding blacklisted special characters like ‘:’, ‘/’, ‘#’) meaning it had 99.25% accuracy reading. The true average around this was 99.00% as seen by the further examples in the appendix.
Lastly, upon scanning a receipt, the system attempts to categorise this based on what the items purchased are. Currently, this is simply a quick look for any keywords such as “Supermarket” to indicate that this is a groceries list. This does work for many situations, however, if an item does not contain the right keywords or there was a problem scanning the keyword it will default to categorising the purchase as “Other”.  While this solution is not optimal, it does not hinder the user or add time to their entry of a purchase and in many situations, it will save time.
5.2.2 Deleting a Purchase
A good example of the quality of work delivered is the purchase lists swipe to delete feature. This feature was discovered when showing to older users a beta version of the project. They instinctively tried to swipe on the list items to see what this did. This is due to common standards across mobile apps that people use every day, i.e. email. Due to these standards people expect a lot more of mobile apps than they did a few years ago. For this reason, this was implemented into this app. However, this was not implemented in the Trips section as Trips instead will be cancelled and moved down to a separate section of the Tips List. 
As this would have to work across multiple devices of vary dimensions this warranted a class with the design calculated for each device it was on in order to determine how far any item was swiped (see Appendix ())
Additionally, the result of this using clear language instead of icons, a red colour and a confirmation message to indicate that this is a delete. The finished design (see Figure 5.2.3) and implementation of this is seamless and functional and feedback from users has been positive. Therefore, this was deemed a successful endeavour.






To summarise, the all features have been done to a high standard especially when considering the timeframe this project was completed in. The two mentioned areas are examples of the quality of work throughout the entire app.
5.3 User Acceptance
In order to access the overall user acceptance of this app a Google Forms survey was created and given it to people who had previously given input towards the projects requirements and some users that had not heard of it before until now. The overall findings of this have been assessed and evaluated and mentioned in other sections of this evaluation. The main points of the app that were liked were:
•	Features Delivered – All features the previously surveyed users stated they would like to have in this app were delivered. Additionally, feedback on these features was very positive with all users that used the app stating they liked the functionality, could use it easily and would recommend it to a friend.
•	Control – Users stated that they liked how they had full control of what was logged and what wasn’t. It was said to be useful for purchases that were considered special circumstances or out of the ordinary.
•	OCR Scans – The response on this was entirely positive with people thinking it was a great way to save time, they barely noticed it was scanning it and it auto-filled fields.
•	Design – The overall response on this was positive with many finding it easy to understand and navigate which was the main goal of the design architecture. There was some feedback stating the design was plain on purchase\trips entry. However, this was intended for ease-of-use and was not considered to be the entire app.
The final section of the survey asked users if they would use this app to track their spending and if they would recommend the app to a friend. As you can see from Appendix (), users all agreed in some degree.
In summary, users were very happy with the functionality and usefulness of the app and agreed the design was acceptable. The only negative feedback is that this wasn’t set up with a bank account like other apps, however, it was not the goal of the project to accomplish this 
5.4 Future Work
Although this project functionally works as intended and feedback has been largely positive, there are still some areas which could be improved if given time.
•	Better Categorisation – If given time, this is something that could be improved upon. This was only not optimised now due to time constraints. The solution could be improved by using an Artificial Intelligence (AI) tool that incorporates Machine Learning (ML) to learn what mistakes are common and learn from corrections the user makes to assigned category. Due to the complexity of this solution it could not be planned in for the scope however some research was done and determined that TensorFlow’s python platform would be the most effective for this app while not impacting the current setups offline capabilities as detrimentally as other platforms such as Google AI and Microsoft Azure AI [8].
•	A More Intelligent Analytics Solution – Currently the analytics Solution is a simple solution. It simply gives generic advice on the type of category that the most was spent on and for trips if most trips are over-budget then it advises to allocate more money or be more careful. This can be viewed in the appendix. This advice is generic due to the time limitations of this project and the complexity of adding this feature. If this was implemented it would break down the data per purchase and analyse the establishment, category and common spending patterns. This way the app could give more in depth advice and help spending on a more realistic level. 
•	Multiple Languages Capabilities – It was initially thought that, due to the travel side of this project, being able to translate languages of receipts could be a valuable feature. However, time did not allow this. With future work this could be implemented using the library react-native-localization [9] to handle the interface change and react-native-power-translator [10] to translate the receipts data. This was deemed out-of-scope for this project.
•	Currency Conversion – While the app currently does accept multiple currencies it does not convert these into the users’ native currency. This could a great piece of functionality and really help users manage their money when travelling as it can relate it to the value they are used to. This could be done via an API that updates with the current rate consistently or simply (to reduce limits to offline capabilities) every hour or two.
•	More Automated Tests – While this project does have some automated test, it could have more. This is an ever increasing and advancing section of any application currently in industry to save time and resources and increase efficiency and built-in quality. The inclusion of automated tests could extend to testing UI components especially changing components, i.e. switching between personal and trips, using a technology such as Jest [11].
5.5 Conclusion
Upon evaluating the work completed, there is a very high volume of features with a great quality of work as seen from evaluating the features content and complexity and getting feedback from potential users. While there are some features that could be improved or included, time did not permit this. Despite this the feedback on the app has been positive with users
6 Conclusion
This project set out to create an app to track expenses of receipts. Using Optical Character Recognition this process was able to be simplified for the user while not forcing them to log unwanted items and giving them full control of what is entered. Additionally, they can see and review their data easily through graphs and search for and update entries whenever required. Finally, an intuitive design allowed for an easily distinguishable switch between Travel Expenses and Personal Spending making this app multi-purposed and achieving each purpose efficiently and effectively.
The design and quality of work have been consistently high. The overall design is simple but effective. Users can pick it up quickly and understand how it works while still finding the overall experience engaging.
Also, by using React-Native, all this functionality was able to be done in a single codebase. This is adaptable to all mobile device dimensions but still maintains distinguishable native elements, such as distinctive message boxes, across different Operating Systems (iOS and Android). This gives the user a familiar feel to the app and increases their overall User Experience.
All the required work and some additional features within this projects scope were completed however there is some future work outlined. This project still achieves its goal effectively and could be released to the public. These additional features are something that I personally would like to work on in the future. They are not essential and instead are just enhancement that could give a competitive edge to the app in production.
Finally, I have learned a great deal from this project. I have learned new technologies, gained a greater appreciation for following the system lifecycle, enhanced both my technical and literary skills and thoroughly enjoyed working on this project.
Overall, the goals of the project have been met with a high quality of work. The resulting app carries out its intended purpose effectively and it has received a lot of positive feedback. If time permitted, there are additional features I would like to include to either enhance the app or reach a larger audience, i.e. multiple languages.





ExpenseLess Review


Please submit feedback regarding the app you just used, including feedback on the experience, the usefulness, and anything of note.

What Is Your Reason For Using This App? *
o	( ) Track My Personal Spending 
o	( ) Track My Travel Expenses 
o	( ) Both 
How Well Did The Receipt Scanner Work For Your Needs *
o	( ) Filled out all the fields and worked perfectly every time 
o	( ) Filled out most of the fields and worked well every time 
o	( ) Filled out few of the fields and worked some of the time 
o	( ) I think this could be improved 

How do you think the scanner could be improved?



How did you feel about the Design and User Experience


	Poor	Fair	Satisfactory	Very good	Excellent
Level of satisfaction	( )	( )	( )	( )	( )

How could the User Experience be improved? 



Areas Of The App


	Poor	Fair	Satisfactory	Very good	Excellent
How was the performance of the app?	( )	( )	( )	( )	( )
How much did you like the Home Screen Data	( )	( )	( )	( )	( )
How much did you like the purchases area	( )	( )	( )	( )	( )
How much did you like the trips area	( )	( )	( )	( )	( )
Overall how much did you like the design	( )	( )	( )	( )	( )
Overall how intuitive was the app	( )	( )	( )	( )	( )
Overall how was the responsiveness of the app	( )	( )	( )	( )	( )
Overall how much did you like the app	( )	( )	( )	( )	( )

Do You Have Any Final Feedback On This App? 



How would you improve this app?




 
 
How do you think the scanner could be improved?
1 response
One of the pictures I took was not a good picture quality, could it enhance the quality for me?

 
How could the User Experience be improved?
2 responses
A different shade of yellow maybe
A bit plain, not very exciting. It's still nice just could be more exciting

Do You Have Any Final Feedback On This App?
3 responses
Great App, very easy to use and looks very helpiul
Amazing little app, could come in handy greatly
Very Easy To Understand How To Use This App And Work Through It
How would you improve this app?
1 response
I would just add to the design a bit and make it more exciting to entice me







