import React, {useEffect, useState} from 'react'
import './index.scss'
import hljs from 'highlight.js';
import Menu from "@/components/Menu";
import {articleApi, categoryApi, classApi} from "@/api/phpApi";
import {isNullOrUndefined} from "@/utils/util";

const Index = () => {
    const [oneMenu, setOneMenu] = useState([])
    const [twoMenu, setTwoMenu] = useState([])
    const [threeMenu, setThreeMenu] = useState([])
    const [anchorList, setAnchorList] = useState([])
    const [currentArticle, setCurrentArticle] = useState({})
    useEffect(() => {
        categoryApi().then(res => {
            setOneMenu(res.data.data)
            articleApi("1").then(res => {
                setCurrentArticle(res.data.data)
                lightCode()
            })
        })
    }, [])
    const lightCode = () => {
        let preElement = document.querySelectorAll(`pre code`)
        preElement.forEach(block => {
            try {
                hljs.highlightElement(block);
            } catch (e) {
                console.log(e);
            }
        });
        let e = document.querySelectorAll("code");
        let e_len = e.length;
        let i;
        for (i = 0; i < e_len; i++) {
            e[i].innerHTML = "<ul><li>" + e[i].innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ul>";
        }
    }
    const goAnchor = (anchorName, numberId) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            let page_Content = document.getElementById("page_Content");
            if (anchorElement) {
                anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
            } else {
                let anchor = anchorList.find(item => item.articleId === numberId)
                if (!isNullOrUndefined(anchor)) {
                    setCurrentArticle(anchor.anchorNav)
                    let timer = setTimeout(() => {
                        goAnchor(anchorName)
                        lightCode()
                        clearTimeout(timer)
                    }, 500)
                    return
                }
                page_Content.scrollTop = 0
            }
        }
    }

    const getTwoMenu = (id) => {
        classApi(id).then(res => {
            if (!isNullOrUndefined(twoMenu.find(littleNavItem => littleNavItem.NavKey === id))) return
            let newMenu = [...twoMenu]
            newMenu.push({NavKey: id, twoNav: res.data.data})
            setTwoMenu(newMenu)
        })
    }
    const getThreeMenu = (id) => {
        classApi(id).then(res => {
            if (!isNullOrUndefined(threeMenu.find(articleNavItem => articleNavItem.NavKey === id))) return
            let newMenu = [...threeMenu]
            newMenu.push({NavKey: id, threeNav: res.data.data})
            setThreeMenu(newMenu)
        })
    }

    const getArticle = (id) => {
        let anchor = anchorList.find(item => item.articleId === id)
        if (!isNullOrUndefined(anchor)) {
            setCurrentArticle(anchor.anchorNav)
            document.getElementById("page_Content").scrollTop = 0;
            return
        }
        articleApi(id).then(res => {
            setCurrentArticle(res.data.data)
            let newMenu = [...anchorList]
            newMenu.push({articleId: id, anchorNav: res.data.data})
            setAnchorList(newMenu)
            lightCode()
            document.getElementById("page_Content").scrollTop = 0;
        })
    }
    return (
        <div className="pageHome">
            <div className="Nav">
                <div className="Nav_Title">FACEGOOD</div>
                <div className="Nav_content">CONTENTS:</div>
                {oneMenu.map(menuItem => {
                    return <Menu name={menuItem.title} key={menuItem.id} click={() => {
                        getTwoMenu(menuItem.id)
                    }}>
                        {twoMenu.map(twoItem => {
                            if (`${menuItem.id}` === `${twoItem.NavKey}`) {
                                return twoItem.twoNav.map(twoMenuItem => {
                                    if (twoMenuItem.cate === 0) {
                                        return <Menu.Article name={twoMenuItem.title}
                                                             key={`Article_${twoMenuItem.id}`}
                                                             haveAnchor={Boolean(twoMenuItem.anchor)}
                                                             click={() => {
                                                                 getArticle(twoMenuItem.id)
                                                             }}
                                        >
                                            {anchorList.map(anchorListItem => {
                                                if (`${anchorListItem.articleId}` === `${twoMenuItem.id}`) {
                                                    return anchorListItem.anchorNav.anchor.map(anchorItem => {
                                                        return <Menu.AnchorPoint name={anchorItem.title}
                                                                                 key={`Anchor_${anchorItem.id}`}
                                                                                 click={() => {
                                                                                     goAnchor(anchorItem.id, anchorListItem.articleId)
                                                                                 }}/>
                                                    })
                                                }
                                                return null
                                            })}
                                        </Menu.Article>
                                    } else {
                                        return <Menu.TwoMenu name={twoMenuItem.title} key={`TwoMenu_${twoMenuItem.id}`}
                                                             click={() => {
                                                                 getThreeMenu(twoMenuItem.id)
                                                             }}
                                        > {threeMenu.map(threeMenuItem => {
                                            if (`${threeMenuItem.NavKey}` === `${twoMenuItem.id}`) {
                                                return threeMenuItem.threeNav.map(threeItem => {
                                                    return <Menu.Article name={threeItem.title}
                                                                         key={`Article_${threeItem.id}`}
                                                                         haveAnchor={Boolean(threeItem.anchor)}
                                                                         click={() => {
                                                                             getArticle(threeItem.id)
                                                                         }}
                                                    >
                                                        {anchorList.map(anchorListItem => {
                                                            if (`${anchorListItem.articleId}` === `${threeItem.id}`) {
                                                                return anchorListItem.anchorNav.anchor.map(anchorItem => {
                                                                    return <Menu.AnchorPoint name={anchorItem.title}
                                                                                             key={`Anchor_${anchorItem.id}`}
                                                                                             click={() => {
                                                                                                 goAnchor(anchorItem.id)
                                                                                             }}/>
                                                                })
                                                            }
                                                            return null
                                                        })}
                                                    </Menu.Article>
                                                })
                                            }
                                            return null
                                        })}
                                        </Menu.TwoMenu>
                                    }
                                })
                            }
                            return null
                        })}
                    </Menu>
                })}
            </div>
            <div className="content" id="page_Content">
                <div className="title">{currentArticle.title}</div>
                {isNullOrUndefined(currentArticle) ? null :
                    <div dangerouslySetInnerHTML={{__html: currentArticle.content}}/>}
            </div>
        </div>
    )
}
export default Index
