'use babel';

import SlotOnlinePulsaView from './slot-online-pulsa-view';
import { CompositeDisposable } from 'atom';

export default {

  slotOnlinePulsaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotOnlinePulsaView = new SlotOnlinePulsaView(state.slotOnlinePulsaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotOnlinePulsaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-online-pulsa:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotOnlinePulsaView.destroy();
  },

  serialize() {
    return {
      slotOnlinePulsaViewState: this.slotOnlinePulsaView.serialize()
    };
  },

  toggle() {
    console.log('SlotOnlinePulsa was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
