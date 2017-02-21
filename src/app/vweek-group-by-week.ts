export class VWeekGroupByWeek {

    week: string;
    avg_pips_ratio: string;
    cnt: string;
    up: string;
    down: string;
    equal: string;


    // fields = ('week', 'avg_pips_ratio', 'cnt', 'up', 'down', 'equal')
    constructor(obj: Object) {
        this.week = obj['week'];
        this.avg_pips_ratio = obj['avg_pips_ratio'];
        this.cnt = obj['cnt'];
        this.up = obj['up'];
        this.down = obj['down'];
        this.equal = obj['equal'];

    }


    // New static method.
    static fromJSONArray(array: Array<Object>): VWeekGroupByWeek[] {
        return array.map(obj => new VWeekGroupByWeek(obj));
    }
}
