import React from 'react'
import PubSub from 'pubsub-js'

import { Image, ImageProps } from 'rebass'
import Icon from 'src/components/Icons'
import { inject, observer } from 'mobx-react'
import { UserStore } from 'src/stores/User/user.store'

interface IProps extends ImageProps {
  width?: string
  userName: string
}

interface IInjected extends IProps {
  userStore: UserStore
}

interface IState {
  avatarUrl?: string
  showFallback?: boolean
}

@inject('userStore')
@observer
export class Avatar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
    this.getUserAvatar(this.props.userName)
  }
  get injected() {
    return this.props as IInjected
  }

  // subscribe/unsubscribe from specific user profile message when
  // user updates their avatar (same url so by default will now be aware of change)
  componentDidMount() {
    PubSub.subscribe('USER_MESSAGE', (message, data) => {
      if (data === 'avatar updated') {
        console.log('avatar update detected')
        this.setState({
          showFallback: false,
        })
      }
    })
  }
  componentWillUnmount() {
    PubSub.clearAllSubscriptions()
  }

  async getUserAvatar(userName: string) {
    const url = await this.injected.userStore.getUserAvatar(userName)
    this.setState({ avatarUrl: url })
  }

  render() {
    return (
      <>
        {this.state.showFallback && <Icon glyph={'account-circle'} />}
        {!this.state.showFallback && this.state.avatarUrl && (
          <Image
            className="avatar"
            width={this.props.width ? this.props.width : 50}
            borderRadius={4}
            src={this.state.avatarUrl}
            onError={() => {
              // if user image doesn't exist show fallback image instead
              this.setState({ showFallback: true })
            }}
          />
        )}
      </>
    )
  }
}
