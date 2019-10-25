import PageHelmet from 'src/app/lib/pagehelmet'
import './index.scss'

export default () => {
  return (
    <div className="memvbership">
      <PageHelmet title={'活动已结束'} link={window.location.pathname} />
      <img
        src={require('src/app/containers/kol_activity/images/icon_sorry.png')}
        alt="...."
      />
      <p className="sorry-text-large">
        本活动已结束，请继续关注LeTote托特衣箱的其他活动
      </p>
    </div>
  )
}
