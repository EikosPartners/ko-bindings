import ko from 'knockout';
import _ from 'lodash';
import {expect} from 'chai';
import simulate from './utils/event';
import template from './clickOff.html';
import clickoff from 'src/clickoff';



describe('clickOff', () => {
    class ClickOff {
        constructor(cb) {
            this.cb = _.once(cb);
            this.color = ko.observable('blue');
        }

        handler() {
            if(this.color() === 'blue') {
                this.color('red');
            } else {
                this.color('blue');
            }
            this.cb();
        }

    }

    //insert the template into the body
    beforeEach(() => {
        let node = document.createElement('div');
        node.setAttribute('id', 'container');
        node.innerHTML = template;
        document.body.appendChild(node);
    });

    //remove the template from the body
    afterEach(() => {
        let node = document.getElementById('container');
        ko.cleanNode(node);
        node.parentElement.removeChild(node);
    });

    //simulate a click on a different element
    it('should clickOff', (done) => {
        let node = document.getElementById('container');
        let vm = new ClickOff(() => {
            done();
        });

        ko.applyBindings(vm, node);
        simulate(document.getElementById('clickOff'), 'click');
    });

    //simulate a click on the same element
    it('should not clickOff', (done) => {
        let node = document.getElementById('container');
        let vm = new ClickOff(() => {
            done('Should not be called');
        });

        ko.applyBindings(vm, node);
        simulate(document.getElementById('app'), 'click');
        //wait for a bit to make sure the handler is not invoked
        setTimeout(() => {
            done();
        }, 50);
    });

    it.skip('should not call handler after removed from DOM');
});
