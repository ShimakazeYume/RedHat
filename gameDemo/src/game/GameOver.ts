class GameOver extends eui.Component implements  eui.UIComponent {

	public btn_again_game:eui.Button;
	public btn_to_share:eui.Button;
	public btn_ranking_list:eui.Button;
	public btn_return:eui.Button;
	public total_score:eui.Label;

	// 单例模式
    private static shared: GameOver;
    public static getInstance() {
        if( !GameOver.shared) {
            GameOver.shared =  new GameOver();
        }
        return GameOver.shared;
    }

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	// 自定义初始化函数
	private init() {
		// 给每个按钮绑定点击事件
		this.btn_again_game.addEventListener(egret.TouchEvent.TOUCH_TAP,this.againGame,this);
		this.btn_to_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toShare,this);
		this.btn_ranking_list.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankingListClick,this);
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClick,this);

	}
	// 再来一局
	private againGame() {
		this.parent.removeChild(this);
		GamePage.getInstance().initGame();
	}
	// 去分享给好友
	private toShare() {
        this.addChild(Task.getInstance());
	}
	// 排行榜
	private rankingListClick() {
        this.addChild(RankingList.getInstance());
	}
	// 返回首页
	private returnClick() {
		GamePage.getInstance().initGame();
		this.parent.removeChild(this);
		GamePage.getInstance().returnClick();
	}
	// 设置分数
	public setScore() {
		var key:string = "score";
		var score:string = egret.localStorage.getItem(key);
		this.total_score.text = score;
		
		egret.setTimeout(function() {
			egret.localStorage.removeItem(key);
		}, this, 5000);
	}
	
}