import {Line, LineChart, ResponsiveContainer} from "recharts";
import BlockHeader from "./blockHeader";
import React from "react";

const getRandomData = () => {
    let data = [];
    const amount = Math.floor(Math.random() * 5) + 5;
    for(let i=0;i<amount;i++){
        data.push({name: 'a', value: Math.floor(Math.random() * 10) + 20})
    }
    return data;
}

const StatGraph = ({graphColor}) => {
    const data = getRandomData();
    return (
        <ResponsiveContainer className='line-chart' >
            <LineChart data={data}
                       margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <Line type="monotone" dataKey="value" stroke={graphColor} dot={false} activeDot={true}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

const StatQuad = ({title, value, format}) => {
    return (
        <div className='stat-quad'>
            <div className='stat-graph'>
                <div className='stat-wrap'>
                    <a className='stat-title'>{title}</a>
                    <a className='stat-value'>{value}</a>
                </div>
                <StatGraph graphColor={'#7E57C2'} />
                <a className='line-chart-time'>{format}</a>
            </div>
        </div>
    );
}

const Stats = (props) => {
    return (
        <div className='block-stat'>
            {props.children}
        </div>
    );
}

const AnalyticsBlock = ({title, data, onViewMore}) => {
    return (
        <div className='block'>
            {title?(<BlockHeader title={title} viewMoreTitle='View All' onViewMore={onViewMore}/>):null}
            <Stats>
                <StatQuad title={data[0].title} value={data[0].value} format={data[0].format} />
                <StatQuad title={data[1].title} value={data[1].value} format={data[1].format} />
                <StatQuad title={data[2].title} value={data[2].value} format={data[2].format} />
                <StatQuad title={data[3].title} value={data[3].value} format={data[3].format} />
            </Stats>
        </div>
    );
}

export default AnalyticsBlock;