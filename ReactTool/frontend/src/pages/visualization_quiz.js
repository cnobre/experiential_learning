import React, { Component, useLayoutEffect, useState, useEffect, FunctionComponent } from 'react';
import { Container, Col, Row, Navbar, Button, ButtonGroup, ToggleButton, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from 'react-countdown';

import AreaChartMini from "../components/areaChart-mini";
import BarChartMini from "../components/barChart-mini";
import BubbleChartMini from "../components/bubbleChart-mini";
import ChoroplethMini from "../components/choropleth-mini";
import Choropleth_High_Mini from "../components/choropleth_highlight-mini";
import Choropleth_Quantized from "../components/choropleth_quantized";
import Choropleth_Original from "../components/choropleth_original";
import HistogramMini from "../components/histogram-mini";
import Histogram_original from "../components/histogram-original";
import LineChartMini from "../components/linechart-mini";
import PieChartMini from "../components/pieChart-mini";
import ScatterPlotMini from "../components/scatterplot-mini";
import StackedBarChartMini from "../components/stacked100bar-mini";
import StackedAreaPlotMini from "../components/stackedArea-mini";
import StackedBarChart2Mini from "../components/stackedbar-mini";
import TreeMapMini from "../components/treeMap-mini";
import axios from 'axios';

import img1 from '../components/data/VLAT-Pics/Scatterplot.png'
import img2 from '../components/data/VLAT-Pics/StackedBar.png'
import img3 from '../components/data/VLAT-Pics/BubbleChart.png'
import img4 from '../components/data/VLAT-Pics/TreeMap.png'
import img5 from '../components/data/VLAT-Pics/StackedBar100.png'
import img6 from '../components/data/VLAT-Pics/Histogram.png'
import img7 from '../components/data/VLAT-Pics/StackedArea.png'
import img8 from '../components/data/VLAT-Pics/Choropleth.png'
import img9 from '../components/data/VLAT-Pics/BarGraph.png'
import img10 from '../components/data/VLAT-Pics/AreaChart.png'
import img11 from '../components/data/VLAT-Pics/Pie.png'
import img12 from '../components/data/VLAT-Pics/LineChart.png'



let minivis = [


    { 'vis': BarChartMini, 'type': 'Bar Chart', 'question': 'What is the average internet speed in Japan?', 'options': ["42.30 Mbps", "40.51 Mbps", "35.25 Mbps", "16.16 Mbps", "I don't know"], 'correct_answer': 1, 'cimage': img9 },
    // New added 
    { 'vis': BarChartMini, 'type': 'Bar Chart', 'question': 'In which country is the internet speed the fastest globally?', 'options': ["China", "Hong Kong", "South Korea", "Vietnam", "I don't know"], 'correct_answer': 2, 'cimage': img9 },
    { 'vis': BarChartMini, 'type': 'Bar Chart', 'question': 'What is the range of the global internet speed?', 'options': ["0 - 100 Mbps", "5 - 98.5 Mbps", "3 - 95 Mbps", "3 - 80 Mbps", "I don't know"], 'correct_answer': 1, 'cimage': img9 },
    { 'vis': BarChartMini, 'type': 'Bar Chart', 'question': 'How many countries  is the internet speed slower than Thailand?', 'options': ["5 countries", "4 countries", "3 countries", "2 countries", "I don't know"], 'correct_answer': 1, 'cimage': img9 },
    // new add
    
    { 'vis': AreaChartMini, 'type': 'Area Chart', 'question': 'What was the average price of pound of coffee beans in October 2019?', 'options': ["$0.71", "$0.90", "$0.80", "$0.63", "I don't know"], 'correct_answer': 0, 'cimage': img10 },
    // New added 
    { 'vis': AreaChartMini, 'type': 'Area Chart', 'question': 'When was the average price of a pound of coffee beans at minimum?', 'options': ["April 2020", "September 2019", "November 2020", "June 2020", "I don't know"], 'correct_answer': 2, 'cimage': img10 },
    { 'vis': AreaChartMini, 'type': 'Area Chart', 'question': 'What was the range of the average price of a pound of coffee beans between January 2019 and December 2020?', 'options': ["$0.5 - $0.9", "$0.55 - $0.9", "$0.55 - $0.86", "$0.5 - $0.8", "I don't know"], 'correct_answer': 0, 'cimage': img10 },
    { 'vis': AreaChartMini, 'type': 'Area Chart', 'question': 'Over the course of 2019, the average price of a pound of coffee beans was ____________.', 'options': ["rising", "falling", "staying", "I don't know"], 'correct_answer': 1, 'cimage': img10 },


    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'Which city\'s metro system has the largest number of stations?', 'options': ['Beijing', 'Shanghai', 'London', 'Seoul', "I don't know"], 'correct_answer': 1, 'cimage': img3 },
    // new add
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'What is the total length of the metro system in Beijing?', 'options': ['300km', '330km', '350km', '400km', "I don't know"], 'correct_answer': 1, 'cimage': img3 },
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'What is the range of the total length of the metro systems?', 'options': ['150 - 500km', '240 - 380 km', '240 - 460 km', '160 - 460 km', "I don't know"], 'correct_answer': 3, 'cimage': img3 },
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'Which city\' s metro system does lie outside the relationship between the total system length and the number of stations most?', 'options': ['Shanghai', 'Beijing', 'New York City', 'London', "I don't know"], 'correct_answer': 1, 'cimage': img3 },
    // In doubt????
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'A group of the metro systems of the world has approximately 300 stations and around a 200 km system length.', 'options': ['True', 'False', "I don't know"], 'correct_answer': 1, 'cimage': img3 },
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': 'In general, the ridership of the metro system increases as the number of stations increases.', 'options': ['True', 'False', "I don't know"], 'correct_answer': 1, 'cimage': img3 },
    { 'vis': BubbleChartMini, 'type': 'Bubble Chart', 'question': '    The metro system in Tokyo has more ridership than the metro system in Guangzhow.', 'options': ['True', 'False', "I don't know"], 'correct_answer': 0, 'cimage': img3 },


    { 'vis': ChoroplethMini, 'type': 'Choropleth', 'question': 'In 2020, the unemployment rate for Washington (WA) was higher than that of Wisconsin (WI).', 'options': ['True', 'False', "I don't know"], 'correct_answer': 0, 'cimage': img8 },
    //new add
    // In doubt???
    { 'vis': Choropleth_High_Mini, 'type': 'Choropleth', 'question': 'What was the unemployment rate for Indiana (IN) in 2020?', 'options': ["5%", "4%", "6%", "I don't know"], 'correct_answer': 0, 'cimage': img8 },
    { 'vis': ChoroplethMini, 'type': 'Choropleth', 'question': 'In which state was the unemployment rate the highest in 2020?', 'options': ['Alaska (AK)', 'New York (NY)', 'Nevada (NV)', 'Texas (TX)' ,"I don't know"], 'correct_answer': 2, 'cimage': img8 },


    { 'vis': HistogramMini, 'type': 'Histogram', 'question': 'What distance have customers traveled in the taxi the most?', 'options': ["60 - 70 Km", "30 - 40 Km", "20 - 30 Km", "50 - 60 Km", "I don't know"], 'correct_answer': 1, 'cimage': img6 },
    // new add
    { 'vis': HistogramMini, 'type': 'Histogram', 'question': 'How many people have traveled the distance between 20 and 40?', 'options': ["362", "412", "462", "512", "I don't know"], 'correct_answer': 2, 'cimage': img6 },
    { 'vis': HistogramMini, 'type': 'Histogram', 'question': 'More people have traveled the distance between 10 and 20 km than between 40 and 50 km.', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img6 },


    { 'vis': LineChartMini, 'type': 'Line Chart', 'question': 'What was the price of a barrel of oil in February 2020?', 'options': ["$50.54", "$47.02", "$42.34", "$42.34", "I don't know"], 'correct_answer': 0, 'cimage': img12 },
    // new add
    { 'vis': LineChartMini, 'type': 'Line Chart', 'question': 'In which month was the price of a barrel of oil the lowest in 2020?', 'options': ["March", "April", "May", "October", "I don't know"], 'correct_answer': 1, 'cimage': img12 },
    { 'vis': LineChartMini, 'type': 'Line Chart', 'question': 'What was the price range of a barrel of oil in 2020?', 'options': ["$15 - $60", "$15.36 - $60.95", "$37.04 - $48.36", "$37.04 - $60.95", "I don't know"], 'correct_answer': 0, 'cimage': img12 },
    { 'vis': LineChartMini, 'type': 'Line Chart', 'question': 'Over the course of the first quarter of 2020, the price of a barrel of oil was ______', 'options': ["rising", "falling", "staying", "I don't know"], 'correct_answer': 1, 'cimage': img12 },
    { 'vis': LineChartMini, 'type': 'Line Chart', 'question': 'About how much did the price of a barrel of oil rise from April to August in 2020', 'options': ["5", "15", "25", "35","I don't know"], 'correct_answer': 2, 'cimage': img12 },
    //new add

    { 'vis': TreeMapMini, 'type': 'Treemap', 'question': 'eBay is nested in the Software category.', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img4 },
    // new add
    { 'vis': TreeMapMini, 'type': 'Treemap', 'question': 'For which website was the number of unique visitors the largest in 2020?', 'options': ['Facebook', 'Google', 'Yahoo!', 'eBay', "I don't know"], 'correct_answer': 1, 'cimage': img4 },
    { 'vis': TreeMapMini, 'type': 'Treemap', 'question': 'The number of unique visitors for Amazon was more than that of Yahoo in 2020', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img4 },

    
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'There is a negative linear relationship between the height and the weight of the 85 males.', 'options': ['True', 'False', "I don't know"], 'correct_answer': 1, 'cimage': img1 },
    // new add
    // In doubt???
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'What is the weight for the person who is 163.3 cm tall?', 'options': ['47.1 kg', '49.1 kg', '51.6 kg' ,'53.9 kg', "I don't know"], 'correct_answer': 0, 'cimage': img1 },
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'What is the height for the tallest person among the 85 individuals?', 'options': ['178.6cm', '180.2 cm', '182.5 cm' ,'186.4 cm', "I don't know"], 'correct_answer': 2, 'cimage': img1 },
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'What is the range in weight for the 85 individuals?', 'options': ['40 - 75 kg', '62.3 - 90.9 kg', '44.3 - 71.2 kg' ,'53.9 - 71.2 kg', "I don't know"], 'correct_answer': 2, 'cimage': img1 },
    // In doubts????
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'What is the height for a person who lies outside the others the most?', 'options': ['178.6cm', '180.2 cm', '176.4 cm' ,'166.4 cm', "I don't know"], 'correct_answer': 2, 'cimage': img1 },
    { 'vis': ScatterPlotMini, 'type': 'Scatterplot', 'question': 'A group of individuals are gathered around the height of 172 cm and the weight of 58 kg.', 'options': ['True', 'False', "I don't know"], 'correct_answer': 0, 'cimage': img1 },



    { 'vis': StackedBarChartMini, 'type': '100% Stacked Bar', 'question': 'Which country has the lowest proportion of Gold medals?', 'options': ["Great Britain", "U.S.A.", "Japan", "Australia", "I don't know"], 'correct_answer': 0, 'cimage': img5 },
    // new add
    // In doubt????
    { 'vis': StackedBarChartMini, 'type': '100% Stacked Bar', 'question': 'What is the Gold medal proportion of Japan?', 'options': ["46%", "34%", "28%", "54%", "I don't know"], 'correct_answer': 0, 'cimage': img5 },
    { 'vis': StackedBarChartMini, 'type': '100% Stacked Bar', 'question': 'The Bronze medal proportion of U.S.A is lower than that of Great Britain', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img5 },


    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'What was the ratio of girls named \'Isla\' to girls named \'Amelia\' in 2012 in the UK?', 'options': ["1 to 1", "1 to 2", "1 to 3", "1 to 4", "I don't know"], 'correct_answer': 1, 'cimage': img7 },
    // new add
    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'What was the number of girls named \'Amelia\' in 2010 in the UK?', 'options': ["1,500", "3,800", "4,200", "8,000", "I don't know"], 'correct_answer': 2, 'cimage': img7 },
    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'Over the course of years between 2009 and 2014, when was the number of girls named \'Amelia\' at the maximum?', 'options': ["2009", "2011", "2012", "2014", "I don't know"], 'correct_answer': 2, 'cimage': img7 },
    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'The number of girls named \'Isla\' was __________ from 2009 to 2012.', 'options': ["rising", "falling", "staying", "I don't know"], 'correct_answer': 0, 'cimage': img7 },
    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'In the UK, the number of girls named \'Amelia\' in 2014 was more than it was in 2013', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img7 },
    { 'vis': StackedAreaPlotMini, 'type': 'Stacked Area', 'question': 'Over the course of years between 2009 and 2014, the number of girls named \'Isla\' was always more than \'Olivia\'.', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img7 },


    { 'vis': StackedBarChart2Mini, 'type': 'Stacked Bar', 'question': 'What is the cost of peanuts in Seoul?', 'options': ["$6.1", "$5.2", "$7.5", "$4.5", "I don't know"], 'correct_answer': 0, 'cimage': img2 },
    // new add
    { 'vis': StackedBarChart2Mini, 'type': 'Stacked Bar', 'question': 'About what is the ratio of the cost of a sandwich to the total cost of room service in Copenhagen?', 'options': ["2 to 10", "3 to 10", "5 to 10", "6 to 10", "I don't know"], 'correct_answer': 2, 'cimage': img2 },
    { 'vis': StackedBarChart2Mini, 'type': 'Stacked Bar', 'question': 'In which city is the cost of soda the highest?', 'options': ["Halsinki", "Oslo", "Seoul", "Paris", "I don't know"], 'correct_answer': 2, 'cimage': img2 },
    { 'vis': StackedBarChart2Mini, 'type': 'Stacked Bar', 'question': 'The cost of vodka in Helsinki is higher than that of Stockholm.', 'options': ["True", "False", "I don't know"], 'correct_answer': 0, 'cimage': img2 },
    { 'vis': StackedBarChart2Mini, 'type': 'Stacked Bar', 'question': 'The ratio of the cost of Soda to the cost of Water in N.Y.C is higher than that of Seoul', 'options': ["True", "False", "I don't know"], 'correct_answer': 1, 'cimage': img2 },
    // new add


    { 'vis': PieChartMini, 'type': 'Pie Chart', 'question': 'What is the approximate global smartphone market share of Samsung?', 'options': ["17.6%", "25.3%", "10.9%", "35.2%", "I don't know"], 'correct_answer': 0, 'cimage': img11 },
    // new add
    { 'vis': PieChartMini, 'type': 'Pie Chart', 'question': 'In which company is the global smartphone market share the smallest?', 'options': ["Apple", "Xiaomi", "Oppo", "Vivo", "I don't know"], 'correct_answer': 3, 'cimage': img11 },
    { 'vis': PieChartMini, 'type': 'Pie Chart', 'question': 'The global smartphone market share of Xiaomi is larger than that of Apple.', 'options': ["True", "False", "I don't know"], 'correct_answer': 0, 'cimage': img11 },
    
];

var record_ques = {}

var score_2 = 0
let initTime = 0
let endTime = 0
var num = 52


class VisQuiz extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            session_id: this.props.location.state.data.session_id,
            current_visualization_index: 0,
            score: 0,
            current_mini_index: 0,
            list_of_min_vis: this.shuffle(minivis),
            responses: {},
            mini_responses: {},
            resize_bool: true,
            device_info: '',
            form_incomplete: false,
            demographic_questions: {
                'sex': null,
                'age': null,
                'education': null,
                'familiarity': null
            },
            demographics_incomplete: true,
            comment: '',
            width: 0,
            height: 0,
            mini_score: 0,
            ip_address: "",
            selectedOption: null,
        }
        )

        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize(e) {
        this.setState({
            resize_bool: !this.state.resize_bool
        })
    }
    handleTextChange(e) {
        this.setState({ comment: e.target.value })
    }

    handleDemographicChange(e) {
        console.log(this.state)
        var new_dq = this.state.demographic_questions
        new_dq[e.target.id] = e.target.value

        var incomplete = false
        for (var key in new_dq) {
            if (new_dq[key] == null) {
                incomplete = true
            }
        }
        if (e.value == 'oth') {
            alert('Hello')
        }

        this.setState({ demographic_questions: new_dq, demographics_incomplete: incomplete })
    }
    getData = async () => {
        //https://medium.com/how-to-react/how-to-get-user-ip-address-in-react-js-73eb295720d0
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log("IP Address:  ", res.data);
        this.setState({
            ip_address: res.data.IPv4
        })
    }

    clicked_mini_answer(type, question, response, truth, time) {
        this.setState({  }); // Don't move to next question here.
    }

    submitAnswer() {
        const { selectedOption } = this.state;
        const currentMini = minivis[this.state.current_mini_index];
        if (this.state.selectedOption === null) {
            alert('You must select at least one option');
          } else {
            // this.clicked_mini_answer(minivis[this.state.current_mini_index]['type'], minivis[this.state.current_mini_index]['question'], minivis[this.state.current_mini_index]['options'][this.state.selectedOption], minivis[this.state.current_mini_index]['correct_answer'], 'timeTaken');
            // this.setState({ selectedOption: null });
            if (selectedOption === currentMini['options'][currentMini['correct_answer']]) {
                this.state.mini_score = this.state.mini_score + 1
            }
            this.setState({
                current_mini_index: this.state.current_mini_index + 1,
                selectedOption: null // Reset selected option after submission.
            });
          }
    }

    // clicked_mini_answer(type, question, response, truth, time) {
    //     this.getData()
    //     if (response === minivis[this.state.current_mini_index]['options'][truth]) {
    //         this.state.mini_score = this.state.mini_score + 1
    //     }
    //     this.setState({
    //         current_mini_index: this.state.current_mini_index + 1,
    //     })
    //     endTime = Math.abs((Date.now() - initTime) / 1000)
    //     this.state.mini_responses[question] = { response: response, truth: truth, time: endTime }
    //     this.setState({
    //         device_info: navigator.userAgent
    //     })
    //     score_2 = this.state.mini_score

    //     if (response === minivis[this.state.current_mini_index]['options'][truth]) {
    //         record_ques[type] = 'Correct'
    //     }
    //     else if (response === 'I don't know') {
    //         record_ques[type] = 'I don't know'
    //     }
    //     else {
    //         record_ques[type] = 'Wrong'
    //     }
    //     console.log("The dictionary is: ", record_ques)
    // }



    shuffle(array) {
        //https://bost.ocks.org/mike/shuffle/
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        // while (m) {

        //     // Pick a remaining element…
        //     i = Math.floor(Math.random() * m--);

        //     // And swap it with the current element.
        //     t = array[m];
        //     array[m] = array[i];
        //     array[i] = t;
        // }
        return array;
    }



    on_survey_click() {

        fetch('./record_responses_to_db', {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                session_id: this.state.session_id,
                responses: this.state.responses,
                mini_responses: this.state.mini_responses,
                score: this.state.score,
                mini_score: this.state.mini_score,
                device: this.state.device_info,
                demographic_responses: this.state.demographic_questions,
                comment: this.state.comment,
                height: window.innerHeight,
                width: window.innerWidth,
                ipaddress: this.state.ip_address
            })
        })
            .then(res => res.json()).then(data => {
                //var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
                //e.returnValue = message;
                //return message;
            })

        var pageType = {
            pathname: '/thank_you',
            state: {
                data: {
                    'session_id': this.state.session_id,
                }
            }
        }
        this.props.history.push(pageType)
    }
    timeout() {
        alert("Time is up! Please select 'Ok' to proceed to the next question.")
        this.setState({
            current_visualization_index: this.state.current_visualization_index + 1,
        })
    }
    getRandom() {
        return Math.random();
    }
    minitimeout() {
        alert("Time is up! Please select 'Ok' to proceed to the next question.")
        this.setState({
            current_mini_index: this.state.current_mini_index + 1,
        })
    }


    render() {
        const hoursMinSecs = { hours: 0, minutes: 0, seconds: 10 }
        const normalStyle = {
            backgroundColor: '#F0F0F0', // Light gray
            color: '#000000' // Black text
          };
        
          const selectedStyle = {
            backgroundColor: '#888888', // Dark gray
            color: '#FFFFFF' // White text
          };

        initTime = Date.now()
        console.log("Starting Time is : " + initTime)
        console.log('render')

        if (this.props.location.state == undefined) {
            window.location.href = "/";
            return (<p>Unknown session. Please start from the <a href={'/'}> consent page</a></p>)
        }
        let ages = []
        for (var i = 18; i < 100; i++) {
            ages.push(i)
        }

        if (this.state == null) {
            return (<p>Loading...</p>)
        }
        if (this.state.current_mini_index < this.state.list_of_min_vis.length) {
            // const options = minivis[this.state.current_mini_index]['options'].map((item, i) =>

            //     <Button variant="secondary" size="sm" className={'question-option'} id={`button_option_${i}`} key={`button_option_${i}`} onClick={() =>
            //         this.clicked_mini_answer(minivis[this.state.current_mini_index]['type'], minivis[this.state.current_mini_index]['question'], item, minivis[this.state.current_mini_index]['correct_answer'], 'timeTaken')}>
            //         {item}
            //     </Button>
            // )
            // const options = minivis[this.state.current_mini_index]['options'].map((item, i) =>
            //     <Button
            //         variant="secondary"
            //         size="sm"
            //         className={'question-option' + (item === this.state.selectedOption ? ' selected' : '')} // Add selected class if this is the selected option.
            //         id={`button_option_${i}`}
            //         key={`button_option_${i}`}
            //         onClick={() =>
            //             this.clicked_mini_answer(minivis[this.state.current_mini_index]['type'], minivis[this.state.current_mini_index]['question'], item, minivis[this.state.current_mini_index]['correct_answer'], 'timeTaken')}
            //     >
            //         {item}
            //     </Button>
            // )
            // Inside the `render` method of your VisQuiz component
            const options = minivis[this.state.current_mini_index]['options'].map((item, i) =>

            <Button 
                variant="secondary" size="sm" className={`question-option ${this.state.selectedOption === i ? 'selected-option' : ''}`} 
                id={`button_option_${i}`} 
                key={`button_option_${i}`} 
                onClick={() => {
                    this.clicked_mini_answer(minivis[this.state.current_mini_index]['type'], minivis[this.state.current_mini_index]['question'], item, minivis[this.state.current_mini_index]['correct_answer'], 'timeTaken');
                    this.setState({ selectedOption: i }); // Set the selected option here
                }}
                style={this.state.selectedOption === i ? selectedStyle : normalStyle}
                >
                {item}
            </Button>
            )

            let VisComp = minivis[this.state.current_mini_index]['vis']
            //console.log(VisComp)
            return (
                <Container className={'container-class'} fluid>
                {/* Move progress bar to the top */}
                    <Row className={'progress-bar-row justify-content-center'} style={{ paddingTop: '20px' }}>
                        <Col xs={30} lg={8}>
                            <ProgressBar 
                            completed={(parseInt(this.state.current_mini_index)).toString()} maxCompleted={num.toString()} 
                            length={Math.min(window.innerWidth, window.innerHeight)} 
                            customLabel={(parseInt(this.state.current_mini_index)).toString() + "/" + num.toString()} 
                            labelAlignment= "center"
                            // labelColor="red"
                            />
                        </Col>
                    </Row>

                    <Row className={'vis-quiz-row'}>
                        <Col lg={10} className={'vis-column'}>
                            <VisComp width={window.innerWidth} height={window.innerHeight} resized={this.state.resize_bool}></VisComp>
                        </Col>
                        <Col lg={2} className={'quiz-column'}>
                            <div className='timeStamp' style={{ marginTop: '20px' }}>
                                <Countdown date={Date.now() + 25000} renderer={({ minutes, seconds, completed }) => {
                                    return <span>Time Remaining: {minutes}:{seconds}</span>;
                                }} autoStart={true} key={Date.now()} onComplete={() => this.minitimeout()} />
                                {/* <CountDownTimer hoursMinSecs={hoursMinSecs} /> */}
                            </div>
                            <div className={'question-container'}>
                                <div className={'question-text'}>
                                    <p>{minivis[this.state.current_mini_index]['question']}</p>
                                </div>

                                {/* <div className={'question-options d-grid gap-2 btn-block'}>
                                    {options}
                                </div> */}
                                <div className={'question-options d-grid gap-2 btn-block'}>
                                    {options}
                                    <Button variant="primary" onClick={this.submitAnswer.bind(this)}>Submit</Button> 
                                </div>
                            </div>

                        </Col>
                    </Row>
                    {/* <Row className={'progress-bar-row'}>
                        <ProgressBar completed={(parseInt(this.state.current_mini_index)).toString()} maxCompleted={num.toString()} length={Math.min(window.innerWidth, window.innerHeight)} />
                    </Row> */}
                </Container>
            );
        }
        else {
            return (
                <>
                    <Row className={'justify-content-center no-margin-row'}>
                        <Col lg={6} className={'text-box text-justify'}>


                            <Form.Group className={'question'}>
                                <Form.Label>Please select your age.</Form.Label>
                                <Form.Select as="select" id={'age'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    {ages.map((d, i) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Please select your gender.</Form.Label>
                                <Form.Select as="select" id={'sex'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option key={'male'} value={'male'}>Male</option>
                                    <option key={'female'} value={'female'}>Female</option>
                                    <option key={'other'} value={'other'}>Other</option>
                                    <option key={'withdraw'} value={'withdraw'}>I do not wish to disclose.</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Please select your highest level of completed education.</Form.Label>
                                <Form.Select as="select" id={'education'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'highschool'}>High School Diploma / GED</option>
                                    <option value={'associate'}>Associate Degree</option>
                                    <option value={'bachelors'}>Bachelors Degree</option>
                                    <option value={'masters'}>Masters Degree</option>
                                    <option value={'doctorate'}>Doctorate Degree</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />
                            <Form.Group className={'question'}>
                                <Form.Label>Are you color-blind?</Form.Label>
                                <Form.Select as="select" id={'color-blind'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'yes'}>Yes</option>
                                    <option value={'no'}>No</option>
                                    <option value={'maybe'}>I do not wish to disclose.</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Please select your familiarity with visualization.</Form.Label>
                                <Form.Select as="select" id={'familiarity'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'not_familiar'}>I have never created a visualization.</option>
                                    <option value={'somewhat'}>I am somewhat familiar.</option>
                                    <option value={'very_familiar'}>I have created visualization systems before. </option>
                                </Form.Select>
                            </Form.Group>
                            <hr />


                            <Form.Group>
                                <Form.Label>Please include any additional comments below. (optional)</Form.Label>
                                <Form.Control as="textarea" id={'comments'} rows={3} onChange={this.handleTextChange.bind(this)}>
                                </Form.Control>
                            </Form.Group>
                            <hr />


                            <div className={'text-center'}><Button className={'btn-sm'}
                                variant={"success"}
                                onClick={this.on_survey_click.bind(this)}
                                disabled={(this.state.form_incomplete || this.state.demographics_incomplete)}
                                id={'survey_submit-btn'}>
                                Submit Responses
                            </Button></div>

                            <p className={'text-box'}></p>
                        </Col>

                    </Row>
                </>

            )
        }
    }
}



export default VisQuiz;
export { score_2 };
export { record_ques };
