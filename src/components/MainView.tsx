import TagButton from "./TagButton"

export default function MainView() {
    return (
        <>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">New prompt</a></li>
                    <li><a href="">Tags</a></li>
                    <li><a href="">Previous prompts</a></li>
                </ul>
            </nav>
            <div className="container">
                <div className="tags">
                    <TagButton name="Debugging" />
                    <TagButton name="Code review" />
                    <TagButton name="Documentation" />
                </div>
                <div className="content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </>
    )
}
