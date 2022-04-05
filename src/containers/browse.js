import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SelectProfileContainer } from "./profiles";
import {Card, Header, Loading, Player } from '../components'
import * as ROUTES from '../constants/routes'
import logo from '../logo.svg';

export function BrowseContainer({slides}){
    console.log("slides", slides);
    const [category, setCategory] = useState('series');
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [slideRows, setslideRows] = useState([]);
    const user = getAuth().currentUser || {};

    useEffect(() =>{
        console.log('profile', profile);
        setTimeout(() =>{
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    useEffect(()=>{
        setslideRows(slides[category]);
    },[slides, category]);

    return profile.displayName ? (
        <>
        {loading ? <Loading src={user.photoURL} />: <Loading.ReleaseBody/>}
        <Header src="UsCover" dontShowOnSmallViewPort>
            <Header.Frame>
                <Header.Group>
                    <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix"/>
                    <Header.TextLink active={category === 'series'? 'true' : 'false'}
                    onClick={()=> setCategory('series')}>Series</Header.TextLink>
                    <Header.TextLink>Films</Header.TextLink>
                </Header.Group>
                <Header.Group>
                <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Header.Profile>
                        <Header.Picture src={user.photoURL} />
                        <Header.Dropdown>
                            <Header.Group>
                                <Header.Picture src={user.photoURL} />
                                <Header.TextLink>{user.displayName}</Header.TextLink>
                            </Header.Group>
                            <Header.Group>
                                <Header.TextLink
                                    // signOut(user).then(() => {
                                    //     // Sign-out successful.
                                    //     }).catch((error) => {
                                    //     // An error happened.
                                    //     });
                                > Sign out
                                </Header.TextLink>
                            </Header.Group>
                        </Header.Dropdown>
                    </Header.Profile>
                </Header.Group>
            </Header.Frame>
            <Header.Feature>
                <Header.FeatureCallOut>
                    Watch Us Now
                </Header.FeatureCallOut>
                <Header.Text>
                    A journey that was meant to be.
                    3 years in the making and finally brought together.
                    Leading to a year filled with love, understanding and compassion.
                </Header.Text>
                <Player>
                           <Player.Button />
                           <Player.Video src="/videos/videoForNetflix.mp4" autoplay/>
                </Player>
            </Header.Feature>
        </Header>
        
        <Card.Group>
            {slideRows.map((slideItem) => (
               <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                   <Card.Title>{slideItem.title}</Card.Title>
                   <Card.Entities>
                        <Card.Item>
                            <Card.Image src={`/images/series/documentaries/citizenfour/small.jpg`} />                               
                        </Card.Item>
                        <Card.Item>
                            <Card.Image src={`/images/display/comedies/C2.jpg`} />                               
                        </Card.Item>
                        <Card.Item>
                            <Card.Image src={`/images/display/comedies/C1.png`} />                               
                        </Card.Item>
                        <Card.Item>
                            <Card.Image src={`/images/display/comedies/C3.jpg`} />                               
                        </Card.Item>
                        <Card.Item>
                            <Card.Image src={`/images/series/documentaries/citizenfour/small.jpg`} />                               
                        </Card.Item>
                       {slideItem.data.map((item)=>(
                           <Card.Item key={item.docId} item={item}>
                                    <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />                               
                                <Card.Meta>
                                    <Card.SubTitle>{item.title}</Card.SubTitle>
                                    <Card.Text>{item.description}</Card.Text>
                               </Card.Meta>
                           </Card.Item>
                       ))}
                   </Card.Entities>
                   <Card.Feature category={category}>
                       <Player>
                           <Player.Button />
                           <Player.Video src="/videos/bunny.mp4"/>
                       </Player>
                   </Card.Feature>
               </Card> 
            ))}
        </Card.Group>
        </>
        ):
    <SelectProfileContainer user={user} setProfile={setProfile}/>;
}