import * as React from 'react';
import moment from 'moment-timezone';
import 'moment-timezone';

export default class Timezones extends React.Component {

    render() {

        var london = moment.tz('Europe/London');
        var losAngeles = london.clone().tz('America/Los_Angeles');
        var newYork = london.clone().tz('America/New_York');
        var tokyo = london.clone().tz('Asia/Tokyo');
        var moscow = london.clone().tz('Europe/Moscow');

        return (

            <React.Fragment>

                <div className='row text-center'>
                    <h1 className='title'>AGENT <span>DISCOVERIES</span></h1>
                </div>
                <div className='row'>
                    <div className='col-sm-2 col-sm-offset-1 text-center timezone'>
                        <h2><span>NEW YORK</span><br/>{newYork.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>LONDON</span><br/>{london.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>LOS ANGELES</span><br/>{losAngeles.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>TOKYO</span><br/>{tokyo.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>MOSCOW</span><br/>{moscow.format('H:mm')}</h2>
                    </div>
                </div>

            </React.Fragment>

        );
    }
}