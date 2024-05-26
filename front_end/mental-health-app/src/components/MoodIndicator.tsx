import {Component} from 'react';
import {Mood} from "../types.tsx";

interface MoodIndicatorProps {
    mood: Mood;
}

class MoodIndicator extends Component<MoodIndicatorProps> {

    render() {
        switch (this.props.mood) {
            case Mood.none:
                return (<> </>);
            case Mood.joy:
                return (<>😃</>);
            case Mood.sadness:
                return (<>😭</>);
            case Mood.anger:
                return (<>😡</>);
            case Mood.fear:
                return (<>😨</>);
            case Mood.surprise:
                return (<>😮</>);
            case Mood.love:
                return (<>😍</>);
        }
    }
}

export default MoodIndicator;