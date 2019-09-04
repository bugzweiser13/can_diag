**CAN Diagnostic Aide Operation and Reasoning**

Techline (phone) Agent Diagnostic Assitant.

Operated as follows:

    -Upon entering site user is allowed to select Hyundai or Genesis for the vehicle brand call is about.
    -When brand is selected, diagnostic aide UI is opened.
    -Within the UI the operator is prompted by dropdown menus to select the following:
        1. Model Selection
        2. Network diagnosing
    -Once the above is selected, the UI populates the following from 5 Models (Tables):
        1. "Vehicle Selected"
             a. An image of the vehicle that was selected
             b. Model Name shown based upon selection
        2. "Good Data" to refer to as diagnosing to include following information:
             a. Network Name popuation based on selection above
             b. Test Location Connector ID
             c. Test Pin #1 (within above Connector)
             d. Test Pin #2 (within above Connector)
             e. Know good measurment values
             f. all above data populated from mySql Databases
             g. A "Data Compare" Button population to enter measurment comparison check page (more on this later)
        3. "Test Connector Location"
             a. Selectable button that opens a popup to show actual connector lay out and pins to test
             b. Depended on Model and/or Network chosen, multiple buttons may be pop[ulated] as there are more than one type of connector
             c. Each of these buttons will open the corrosponding image needed (I.E. All G80 Networks)
             d. If button is hovered over, title will show which connector will be shown
             e. Connector location image, highlighting actual location within vehicle (image src supplied by mySql data)
             f. If the mouse is hovered over, a title states "click to enlarge", when clicked a serperate tab opens giving a bigger image.
        4. "Network"
             a. Network selected is shown (based on selection)
             b. Network layout shown with the test connector and each Terminating Resistor location marked
             c. Image is populated based on network selection and sourced from mySql database
             d. If the mouse is hovered over, a title states "click to enlarge", when clicked a serperate tab opens giving a bigger image.
             c. With Networks that have more than one page, a page selection button will populate allowing toggle between pages (I.E. G90 P-CAN Netork)
        5. "Terminating Resistor Locations"
             a. Each Terminating resistor location shown (Module's Acronym)
             b. Next to each Module Acronym a button is populated to show the connector and test location for that module
             c. For models that have different test locations based on options and/or year, multiple buttons may be possible (I.E. G90 V6 & V8)
             d. All above populated from mySql database

    - Data Compare Screen
        1.  Upon button selection a seperate popup will open
        2.  Within this page, the following data needed to be inputed from testing by the technician calling in to techline:
             a. Total Resistance
             b. Split CAN Resistance (Male)
             c. Split CAN Resistance (Female)
             d. CAN Voltage (High Side)
             e. CAN Voltage (Low Side)
             f. CAN Resistance to Ground (High Side)
             g. CAN Resistance to Ground (Low Side)
        3.  Submission button is greyed out until all data is inputed
        4.  Page can be exited without entering any data by selecting exit
        5.  Model image is populated from data supplied by main page when opened (will vary depending on original model selected)
        6.  Once all data is inputed, the model image will switch to a results page
        7.  Result page will give suggested diagnostic path based on readings inputed
        8.  Page has self logic that will do the following:
             a. compare the addition of both split resistance inputed by the user and compare the result to the inputed total resistance
             b. If the comparison is off by a given amount, will show "Recheck Inputed Value" on all related.
        9.  Diagnostic suggestions are based off of known good values and ranges agreed upon by all testing team
        10. All values are inputed as whole numbers, logic will place the decimal as needed (I.E. Total Resistance 600 entered will equal 60.0)
        10. Known good values as shown below will show good value when inputed:
            a. Total Resistance = 60.0
            b. Split CAN Resistance (Male) = 121.0
            c. Split CAN Resistance (Female) = 119.0
            d. CAN Voltage (High Side) 2.80
            e. CAN Voltage (Low Side) 2.20
            f. CAN Resistance to Ground (High Side) = 800
            g. CAN Resistance to Ground (Low Side) = 800
        11. Good results will come back as green and bad will be red
        12. Depending on corrolation of inputed values, will populate different diagnostic patch based on related to each reading
        13. This is calculated from known testing and results there from.
        14. The calculated Total Resistance is shown to compare to entered value
        15. Once results are shown, have the option to exit or re-enter new values (by button population)


**Items that need to be added on future releases**

    - Addition of admin page to perform the following:
        1. Make changes to models / database as needed without entering a mySql Workbench (login test / start1)
        2. Add addition models and their related information as they are released
    - Navbar with a resource page as needed
    - Compition of the "Hyundai" branded page (currently on "Genesis" operational)
    - Any item / changes that are needed after real world testing