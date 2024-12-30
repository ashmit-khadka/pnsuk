import React from 'react'
import { NavLink } from 'react-router'
import { ReactComponent as IconMenu } from '../assets/icons/menu.svg'
import { ReactComponent as IconClose } from '../assets/icons/cancel.svg'
import { ReactComponent as IconDownArrow } from '../assets/icons/down-arrow.svg'
import { ReactComponent as IconBanner } from '../assets/icons/banner.svg'
import { ReactComponent as IconDocument } from '../assets/icons/document.svg'
import { ReactComponent as IconDonate } from '../assets/icons/donate.svg'
import DocConstitution from '../assets/docs/constitution.pdf'
import DocPropertyPolicy from '../assets/docs/PNS_Property_Acquisition_Proposal.pdf'
import DocDonationPolicy from '../assets/docs/Donation_Fund_Collection_Policy.pdf'
import DocSafeguardingPolicy from '../assets/docs/PNS_Safeguarding_Policy.pdf'
import DocHealthSafetyPolicy from '../assets/docs/Health_and_Safety_Policy.pdf'
import DocDataProtectionPolicy from '../assets/docs/Data_Protection_Policy.pdf'
import DocGlance from '../assets/docs/PNS_glance.pdf'


const toggleModal = () => {
    document.getElementById('donate-modal').classList.toggle('hide')
}

const toggleSubMenu = (id) => {
    document.getElementById(id).classList.toggle('dropdown-mobile__container')
}

const Navigation = (props) => {

    let menu = false

    const toggleMenu = () => {
        if (menu) {
            menu = false
        } 
        else {
            menu = true
        }
        document.getElementById('navigation-menu').classList.toggle('navigation-menu--show')
    }

    return (
        <div className='navigation'>
            <div className='navigation__id'>
                <IconMenu className='navigation__icon w-2 h-2' onClick={toggleMenu}/>

                <NavLink to='/' exact={true}>
                    <img className='navigation__logo' src='/assets/media/logo/logo.jpg'></img>
                </NavLink>

                <div className='navigation__organisation'>
                    <span className='navigation__organisation--main'>Peterborough Nepalese Society</span>
                    <span className='navigation__organisation--sub'>पिटरबरो नेपाली समाज</span>
                    <span className='navigation__organisation--sub'>Regd Charity 1169904, Estd. 2007</span>
                </div>

                <IconDonate className='navigation__icon w-2 h-2' onClick={toggleModal}/>
            </div>
            <div className='navigation__menu'>
                <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/' exact={true}>Home</NavLink>
                <div className='dropdown'>
                    <button className="navigation-item dropdown__button">
                        About Us <IconDownArrow/>
                    </button>
                    <div className="dropdown__container" id='dowpdown-about'>
                        <a className='navigation-item' href={DocGlance} target='_blank'>PNS at a Glance<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocConstitution} target='_blank'>Constitution<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocPropertyPolicy} target='_blank'>PNS Property Acquisition Proposal<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocDonationPolicy} target='_blank'>Donation Fund Collection Policy<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocSafeguardingPolicy} target='_blank'>PNS Safeguarding Policy<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocHealthSafetyPolicy} target='_blank'>Health and Safety Policy<IconDocument className="w-2 h-2" /></a>
                        <a className='navigation-item' href={DocDataProtectionPolicy} target='_blank'>Data Protection Policy<IconDocument className="w-2 h-2" /></a>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/minutes'>Minutes</NavLink>
                    </div>
                </div>
                <NavLink className='navigation-item' activeClassName='navigation-item navigation-item--active' to='/category/type=news' exact={true}>News</NavLink>
                <div className='dropdown'>
                    <button className="navigation-item dropdown__button">
                        Events <IconDownArrow className='w-2 h-2'/>
                    </button>
                    <div className="dropdown__container" id='dowpdown-about'>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/category/type=upcomming'>Upcomming</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/category/type=event'>Past</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/category/type=aid'>Charity Work</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/category/type=guest'>Special Events</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/category/type=sport'>Sports</NavLink>
                    </div>
                </div>
                <NavLink className='navigation-item' activeClassName='navigation-item navigation-item--active' to='/category/type=project' exact={true}>Projects</NavLink>

                <div className='dropdown'>
                    <button className="navigation-item dropdown__button">
                        Committee <IconDownArrow className='w-2 h-2'/>
                    </button>
                    <div className="dropdown__container" id='dowpdown-about'>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/committee/type=management'>Management</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/committee/type=trustee'>Trustee Board</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/committee/type=advisor'>Advisory Body</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/committee/type=active_members'>Active Members</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/committee/type=volunteer'>Volunteers</NavLink>
                        <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/membership'>General Membership Form</NavLink>
                    </div>
                </div>
                <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/gallery' exact={true}>Gallery</NavLink>
                <NavLink className='navigation-item' activeClassName='navigation-item navigation-item--active' to='/advertise' exact={true}>Advertise</NavLink>
                <NavLink className='navigation-item' activeClassName='navigation-item navigation-item--active' to='/contact-us' exact={true}>Contact Us</NavLink>
                <div className='navigation-item navigation-item--donate' onClick={toggleModal}>Donate
                    <IconBanner className='w-2 h-2'/>
                </div>
            </div>

            <div id='navigation-menu' className='navigation-menu'>
                <div className='navigation-menu__background' onClick={toggleMenu}>
                </div>
                <div className='navigation-menu__pane'>
                    <IconClose className='navigation__icon w-2 h-2' onClick={toggleMenu}/>
                    <NavLink className='navigation-menu__item' activeClassName='navigation-item--active' to='/' exact={true} onClick={toggleMenu}>Home</NavLink>
                    <div className='navigation-menu__item' onClick={() => toggleSubMenu('dropdown-mobile-about')}>About Us <IconDownArrow className='dropdown-mobile__sub-arrow w-2 h-2'/>
                        <div className='hide' id='dropdown-mobile-about'>
                            <a className='navigation-item' href={DocGlance} target='_blank' onClick={toggleMenu}>At a Glance<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocConstitution} target='_blank' onClick={toggleMenu}>Constitution<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocPropertyPolicy} target='_blank' onClick={toggleMenu}>PNS Property Acquisition Proposal<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocDonationPolicy} target='_blank' onClick={toggleMenu}>Donation Fund Collection Policy<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocSafeguardingPolicy} target='_blank' onClick={toggleMenu}>PNS Safeguarding Policy<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocHealthSafetyPolicy} target='_blank' onClick={toggleMenu}>Health and Safety Policy<IconDocument className="w-2 h-2" /></a>
                            <a className='navigation-item' href={DocDataProtectionPolicy} target='_blank' onClick={toggleMenu}>Data Protection Policy<IconDocument className="w-2 h-2" /></a>

                            <NavLink className='navigation-item' activeClassName='navigation-item--active' to='/minutes' onClick={toggleMenu}>Minutes</NavLink>
                        </div>
                    </div>
                    <NavLink className='navigation-menu__item' activeClassName='navigation-item--active' to='/category/type=news' exact={true} onClick={toggleMenu}>News</NavLink>
                    <div className='navigation-menu__item' onClick={() => toggleSubMenu('dropdown-mobile-events')}>Events <IconDownArrow className='dropdown-mobile__sub-arrow w-2 h-2'/>
                        <div className='hide' id='dropdown-mobile-events'>
                        <NavLink className='navigation-menu__item' to='/category/type=upcomming' onClick={toggleMenu}>Upcomming</NavLink>
                        <NavLink className='navigation-menu__item' to='/category/type=event' onClick={toggleMenu}>Past</NavLink>
                        <NavLink className='navigation-menu__item' to='/category/type=aid' onClick={toggleMenu}>Charity Work</NavLink>
                        <NavLink className='navigation-menu__item' to='/category/type=guest' onClick={toggleMenu}>Special Events</NavLink>
                        <NavLink className='navigation-menu__item' to='/category/type=sport' onClick={toggleMenu}>Sports</NavLink>
                        </div>
                    </div>
                    <NavLink className='navigation-menu__item' activeClassName='navigation-item--active' to='/category/type=project' exact={true} onClick={toggleMenu}>Projects</NavLink>
                    <div className='navigation-menu__item' onClick={() => toggleSubMenu('dropdown-mobile-committee')}>Committee <IconDownArrow className='dropdown-mobile__sub-arrow w-2 h-2'/>
                        <div className='hide' id='dropdown-mobile-committee'>
                        <NavLink className='navigation-menu__item' to='/committee/type=management' onClick={toggleMenu}>Managmeent</NavLink>
                        <NavLink className='navigation-menu__item' to='/committee/type=trustee' onClick={toggleMenu}>Trustee Board</NavLink>
                        <NavLink className='navigation-menu__item' to='/committee/type=advisor' onClick={toggleMenu}>Advisory Body</NavLink>
                        <NavLink className='navigation-menu__item' to='/committee/type=active_members' onClick={toggleMenu}>Active Members</NavLink>
                        <NavLink className='navigation-menu__item' to='/committee/type=volunteer' onClick={toggleMenu}>Volunteers</NavLink>
                        <NavLink className='navigation-menu__item' to='/membership' onClick={toggleMenu}>General Membership Form</NavLink>
                        </div>
                    </div>
                    <NavLink className='navigation-menu__item' activeClassName='navigation-item--active' to='/advertise' exact={true} onClick={toggleMenu}>Advertise</NavLink>
                    <NavLink className='navigation-menu__item' activeClassName='navigation-item--active' to='/advertise' exact={true} onClick={toggleMenu}>Contact Us</NavLink>                
                </div>
            </div>
        </div>
    )
}

export default Navigation