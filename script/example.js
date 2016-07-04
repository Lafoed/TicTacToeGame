var options = {
  size: 3
};


var Cell = React.createClass({

  cellClick: function(e) {
    e.preventDefault();
    if (!e.target.classList.contains('none')) return;
    var state = 'cross';
    var coords= {
      x:+e.target.classList[1].slice(4),
      y:+e.target.classList[2].slice(4)
    };
    this.props.changerFieldState(coords,state);
  },


  render: function(){
    var fieldState = this.props.cells;
    var fieldTemplate = [];

    for (var k=0; k<  fieldState.length; k++) {
      fieldTemplate.push(<br key={k}/>);

      for( var f=0; f < fieldState[k].length; f++) {
        fieldTemplate.push(<div className={'cell col-'+k+' row-'+f + " " +
                                fieldState[k][f]}
                                key ={k+''+f}></div>)}
    }

    return <div onClick={this.cellClick}>
             {fieldTemplate}
           </div>},
});



var Field = React.createClass({
  propTypes:{
    size: React.PropTypes.number.isRequired
  },

  getInitialState:function(){
    //начальное состояние поля
    var arr = [];
    for (var i=0;i<this.props.size; i++){
      arr.push([]);
      for (var j=0;j<this.props.size; j++){
        arr[i].push('none');
      }
    }
    return { cellsState:arr,
             finishGame:false}
  },


  changerFieldState: function(coords,state) {
    //Запись хода игрока
    this.state.cellsState[coords.x][coords.y] = state;
    this.state.gameStatus = checkEnd(this.state.cellsState);
    //Ход компьютера
    if ( !this.state.gameStatus.status ) {
      var aiMove = aiThink(this.state.cellsState);
      this.state.cellsState[aiMove.y][aiMove.x] = 'circle';
    }
    this.state.gameStatus = checkEnd(this.state.cellsState);
    this.setState({cellsState:this.state.cellsState});
  },

  componentDidUpdate: function(){
    //вывод сообщение о результатах после отрисовки поля
    if(this.state.gameStatus.status){
      if(!this.state.gameStatus.winMark) {
        alert('Draw!');
        this.state.finishGame = true;
      } else {
        alert(this.state.gameStatus.winMark + ' win!');
        this.state.finishGame = true;}
    }
    if(this.state.finishGame) {
      var answer = confirm('Start again?');
      if(answer) this.props.restart();
    }
  },

  render: function(){
    return <div>
              <Cell cells = {this.state.cellsState} changerFieldState = {this.changerFieldState} />
           </div>
  }
});

var Game = React.createClass({
  getInitialState(){
    return{ visable:false}
  },

  startGame(){
    this.setState({visable:true});
  },

  restart(){
    this.setState({visable:false});
  },

  render: function() {
    var template;
    if(this.state.visable){
      template = <Field size={options.size} restart = {this.restart}/>
    }
    return <div className = 'field'>
              <a className={(this.state.visable ? 'hide':'')}
                   onClick = {this.startGame}>Start game</a>
              {template}
           </div>
  }
});


  ReactDOM.render(
    <Game/>,
    document.getElementById('game-tic-tac-toe'));

